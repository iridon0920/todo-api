import { InjectRepository } from '@nestjs/typeorm'
import { UserModel } from '../model/user.model'
import { Repository } from 'typeorm'

export class UsersRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

  async save(userModel: UserModel, hashPassword?: string) {
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
