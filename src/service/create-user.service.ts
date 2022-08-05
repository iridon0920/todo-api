import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersRepository } from '../repository/users.repository'
import { User } from '../domain/user/user'
import { Email } from '../domain/user/value-object/email'
import { UserName } from '../domain/user/value-object/user-name'
import * as bcrypt from 'bcrypt'
import { CreateUserParam } from '../dto/create-user-param'
import { convertToUserResponse } from '../domain/user/function/convert-to-user-response'
import { convertToUserModel } from '../domain/user/function/convert-to-user-model'

@Injectable()
export class CreateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(param: CreateUserParam) {
    if (await this.existsEmail(param.email)) {
      throw new HttpException(
        'メールアドレスが重複しています。',
        HttpStatus.BAD_REQUEST,
      )
    }

    const user = new User(
      await this.getNewUserId(),
      new Email(param.email),
      new UserName(param.name),
    )

    const userModel = convertToUserModel(user)
    const hashPassword = await bcrypt.hash(param.password, 10)

    await this.usersRepository.save(userModel, hashPassword)

    return convertToUserResponse(user)
  }

  private async existsEmail(email: string) {
    const results = await this.usersRepository.findEmail(email)
    return results.length > 0
  }

  private async getNewUserId() {
    const usersCount = await this.usersRepository.count()
    return usersCount + 1
  }
}
