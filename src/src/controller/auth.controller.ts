import { Body, Controller, Post } from '@nestjs/common'
import { AuthLoginParam } from '../dto/request/auth/auth-login-param'
import { AuthLoginService } from '../auth/auth-login.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authLoginService: AuthLoginService) {}

  /**
   * ユーザログイン
   */
  @Post('login')
  async login(@Body() param: AuthLoginParam) {
    const access_token = await this.authLoginService.execute(param)
    return { access_token }
  }
}
