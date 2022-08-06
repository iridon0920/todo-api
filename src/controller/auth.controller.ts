import { Body, Controller, Post } from '@nestjs/common'
import { AuthLoginService } from '../auth/auth-login.service'
import { AuthLoginParam } from '../dto/request/auth/auth-login-param'

@Controller('auth')
export class AuthController {
  constructor(private readonly authLoginService: AuthLoginService) {}

  @Post('login')
  async login(@Body() param: AuthLoginParam) {
    const access_token = await this.authLoginService.execute(param)
    return { access_token }
  }
}
