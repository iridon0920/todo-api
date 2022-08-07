import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../repository/users.repository'
import { UpdateUserParam } from '../dto/request/user/update-user-param'

@Injectable()
export class UpdateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: number, param: UpdateUserParam) {
    const user = await this.usersRepository.findById(userId)

    if (param.name) {
      user.changeName(param.name)
    }

    await this.usersRepository.save(user)

    return user
  }
}
