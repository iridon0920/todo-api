import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserModel } from '../model/user.model'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { AuthLoginParam } from '../dto/request/auth/auth-login-param'

@Injectable()
export class AuthLoginService {
  constructor(
    @InjectRepository(UserModel)
    private readonly authUserRepository: Repository<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(param: AuthLoginParam) {
    const userModel = await this.authUserRepository.findOne({
      where: { email: param.email },
    })
    if (
      userModel !== null &&
      (await bcrypt.compare(param.password, userModel.password))
    ) {
      return this.jwtService.sign({
        userId: userModel.id,
        email: userModel.email,
      })
    }
    throw new HttpException(
      'ユーザ認証に失敗しました。',
      HttpStatus.UNAUTHORIZED,
    )
  }
}
