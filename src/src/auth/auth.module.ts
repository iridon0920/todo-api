import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from '../model/user.model'
import { AuthLoginService } from './auth-login.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      // 認証JWT有効期限
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([UserModel]),
  ],
  providers: [AuthLoginService, JwtStrategy],
  exports: [AuthLoginService],
})
export class AuthModule {}
