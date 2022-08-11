import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserRepository } from '../../repository/user.repository'
import { CreateUserParam } from '../../dto/request/user/create-user-param'
import { User } from '../../domain/user/user'
import { Email } from '../../domain/user/value-object/email'
import { Password } from '../../domain/user/value-object/password'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class CreateUserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async execute(param: CreateUserParam) {
    if (await this.existsEmail(param.email)) {
      throw new HttpException(
        'メールアドレスが重複しています。',
        HttpStatus.BAD_REQUEST,
      )
    }

    const user = new User(uuidv4(), new Email(param.email), param.name)
    const password = new Password(param.password)

    await this.usersRepository.create(user, password)

    return user
  }

  private async existsEmail(email: string) {
    const count = await this.usersRepository.findEmailCount(email)
    return count > 0
  }
}
