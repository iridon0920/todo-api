import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { CreateUserService } from '../service/create-user.service'
import { convertToUserResponse } from '../domain/user/function/convert-to-user-response'
import { UserResponse } from '../dto/response/user/user-response'
import { CreateUserParam } from '../dto/request/user/create-user-param'
import { UpdateUserParam } from '../dto/request/user/update-user-param'
import { UpdateUserService } from '../service/update-user.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { AuthUserParam } from '../dto/request/auth/auth-user-param'
import { DeleteUserService } from '../service/delete-user.service'

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Post()
  async create(@Body() param: CreateUserParam): Promise<UserResponse> {
    const user = await this.createUserService.execute(param)
    return convertToUserResponse(user)
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(
    @Request() request: AuthUserParam,
    @Body() param: UpdateUserParam,
  ): Promise<UserResponse> {
    const user = await this.updateUserService.execute(
      request.user.userId,
      param,
    )
    return convertToUserResponse(user)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Request() request: AuthUserParam) {
    await this.deleteUserService.execute(request.user.userId)
  }
}
