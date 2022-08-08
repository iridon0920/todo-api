import { InjectRepository } from '@nestjs/typeorm'
import { UserModel } from '../model/user.model'
import { Repository } from 'typeorm'
import { User } from '../domain/user/user'
import { convertToUserModel } from '../domain/user/function/convert-to-user-model'
import { Password } from '../domain/user/value-object/password'
import { HttpException, HttpStatus } from '@nestjs/common'
import { Email } from '../domain/user/value-object/email'

export class UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

  async findById(userId: string) {
    const userModel = await this.repository.findOne({ where: { id: userId } })

    if (userModel === null) {
      throw new HttpException('ユーザが見つかりません。', HttpStatus.NOT_FOUND)
    }

    return new User(userModel.id, new Email(userModel.email), userModel.name)
  }

  async save(user: User, password?: Password) {
    const userModel = convertToUserModel(user)

    if (password) {
      userModel.password = await password.getHash()
    }

    await this.repository.save(userModel)
  }

  async delete(userId: string) {
    await this.repository.delete(userId)
  }

  findEmail(email: string) {
    return this.repository.find({ where: { email } })
  }
}
