import { InjectRepository } from '@nestjs/typeorm'
import { UserModel } from '../model/user.model'
import { Repository } from 'typeorm'
import { User } from '../domain/user/user'
import { convertToUserModel } from '../domain/user/function/convert-to-user-model'
import { Password } from '../domain/user/value-object/password'
import { HttpException, HttpStatus } from '@nestjs/common'
import { Email } from '../domain/user/value-object/email'
import { UserName } from '../domain/user/value-object/user-name'

export class UsersRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

  async findById(userId: number) {
    const userModel = await this.repository.findOne({ where: { id: userId } })
    if (userModel === null) {
      throw new HttpException('ユーザが見つかりません。', HttpStatus.NOT_FOUND)
    }

    return new User(
      userModel.id,
      new Email(userModel.email),
      new UserName(userModel.name),
    )
  }

  async save(user: User, password?: Password) {
    const userModel = convertToUserModel(user)

    if (password) {
      userModel.password = await password.getHash()
    }

    await this.repository.save(userModel)
  }

  count() {
    return this.repository.count()
  }

  findEmail(email: string) {
    return this.repository.find({ where: { email } })
  }
}
