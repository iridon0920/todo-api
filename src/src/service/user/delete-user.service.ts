import { Injectable } from '@nestjs/common'
import { UserRepository } from '../../repository/user.repository'

@Injectable()
export class DeleteUserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async execute(userId: string) {
    await this.usersRepository.delete(userId)
  }
}
