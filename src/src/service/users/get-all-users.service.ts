import { Injectable } from '@nestjs/common'
import { UserRepository } from '../../repository/user.repository'

@Injectable()
export class GetAllUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    return await this.userRepository.findAll()
  }
}
