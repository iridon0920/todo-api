import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserService } from '../service/create-user.service'
import { CreateUserParam } from '../dto/create-user-param'
import { UserResponse } from '../dto/user-response'

@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(@Body() param: CreateUserParam): Promise<UserResponse> {
    return await this.createUserService.execute(param)
  }
}
