import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersRepository } from '../repository/users.repository'
import { User } from '../domain/user/user'
import { Email } from '../domain/user/value-object/email'
import { UserName } from '../domain/user/value-object/user-name'
import { Password } from '../domain/user/value-object/password'
import { CreateUserParam } from '../dto/request/user/create-user-param'

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
    const password = new Password(param.password)

    await this.usersRepository.save(user, password)

    return user
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
