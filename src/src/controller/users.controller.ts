import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UserResponse } from '../dto/response/user/user-response'
import { GetUserService } from '../service/users/get-user.service'
import { GetAllUsersService } from '../service/users/get-all-users.service'
import { convertToUserResponse } from '../domain/user/function/convert-to-user-response'

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly getAllUsersService: GetAllUsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UserResponse[]> {
    const users = await this.getAllUsersService.execute()
    return users.map((user) => convertToUserResponse(user))
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponse> {
    const user = await this.getUserService.execute(id)
    return convertToUserResponse(user)
  }
}
