import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { AuthLoginParam } from '../dto/request/auth/auth-login-param'
import { UserRepository } from '../repository/user.repository'

@Injectable()
export class AuthLoginService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(param: AuthLoginParam) {
    const hashPassword = await this.userRepository.findHashPasswordById(
      param.userId,
    )
    if (
      hashPassword !== undefined &&
      (await bcrypt.compare(param.password, hashPassword))
    ) {
      return this.jwtService.sign({
        userId: param.userId,
      })
    }
    throw new HttpException(
      'ユーザ認証に失敗しました。',
      HttpStatus.UNAUTHORIZED,
    )
  }
}
