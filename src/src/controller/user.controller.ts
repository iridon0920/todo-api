import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { convertToUserResponse } from '../domain/user/function/convert-to-user-response'
import { UserResponse } from '../dto/response/user/user-response'
import { CreateUserParam } from '../dto/request/user/create-user-param'
import { UpdateUserParam } from '../dto/request/user/update-user-param'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { AuthUserParam } from '../dto/request/auth/auth-user-param'
import { CreateUserService } from '../service/user/create-user.service'
import { UpdateUserService } from '../service/user/update-user.service'
import { DeleteUserService } from '../service/user/delete-user.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  /**
   * 新規ユーザ作成
   */
  @Post()
  async create(@Body() param: CreateUserParam): Promise<UserResponse> {
    const user = await this.createUserService.execute(param)
    return convertToUserResponse(user)
  }

  /**
   * 認証ユーザ情報更新
   */
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

  /**
   * 認証ユーザ情報削除
   */
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Request() request: AuthUserParam) {
    await this.deleteUserService.execute(request.user.userId)
  }
}
