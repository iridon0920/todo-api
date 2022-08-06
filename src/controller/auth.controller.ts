import { Body, Controller, Post } from '@nestjs/common'
import { LoginUserParam } from '../dto/login-user-param'
import { AuthLoginService } from '../auth/auth-login.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authLoginService: AuthLoginService) {}

  @Post('login')
  async login(@Body() param: LoginUserParam) {
    const access_token = await this.authLoginService.execute(param)
    return { access_token }
  }
}
