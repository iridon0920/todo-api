import { InjectRepository } from '@nestjs/typeorm'
import { UserModel } from '../model/user.model'
import { Repository } from 'typeorm'
import { User } from '../domain/user/user'
import { convertToUserModel } from '../domain/user/function/convert-to-user-model'
import { Password } from '../domain/user/value-object/password'

export class UsersRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

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
