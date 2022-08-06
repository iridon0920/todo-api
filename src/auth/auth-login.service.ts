import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserModel } from '../model/user.model'
import { Repository } from 'typeorm'
import { LoginUserParam } from '../dto/login-user-param'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthLoginService {
  constructor(
    @InjectRepository(UserModel)
    private readonly authUserRepository: Repository<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(param: LoginUserParam) {
    const userModel = await this.authUserRepository.findOne({
      where: { email: param.email },
    })
    if (await bcrypt.compare(param.password, userModel.password)) {
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
