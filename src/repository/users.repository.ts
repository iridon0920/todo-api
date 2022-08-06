import { InjectRepository } from '@nestjs/typeorm'
import { UserModel } from '../model/user.model'
import { Repository } from 'typeorm'
import { User } from '../domain/user/user'
import { convertToUserModel } from '../domain/user/function/convert-to-user-model'

export class UsersRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

  async save(user: User, hashPassword?: string) {
    const userModel = convertToUserModel(user)

    if (hashPassword) {
      userModel.password = hashPassword
    }

    return await this.repository.save(userModel)
  }

  async count() {
    return await this.repository.count()
  }

  async findEmail(email: string) {
    return await this.repository.find({ where: { email } })
  }
}
