import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../../repository/users.repository'

@Injectable()
export class DeleteUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: number) {
    await this.usersRepository.delete(userId)
  }
}
