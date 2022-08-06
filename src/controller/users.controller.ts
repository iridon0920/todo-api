import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserService } from '../service/create-user.service'
import { convertToUserResponse } from '../domain/user/function/convert-to-user-response'
import { UserResponse } from '../dto/response/user/user-response'
import { CreateUserParam } from '../dto/request/user/create-user-param'

@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(@Body() param: CreateUserParam): Promise<UserResponse> {
    const user = await this.createUserService.execute(param)
    return convertToUserResponse(user)
  }
}
