import { Injectable } from '@nestjs/common'
import { UserRepository } from '../../repository/user.repository'

@Injectable()
export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string) {
    return await this.userRepository.findById(userId)
  }
}
