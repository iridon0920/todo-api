import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { AuthLoginService } from './auth-login.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from '../model/user.model'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([UserModel]),
  ],
  providers: [AuthLoginService],
  exports: [AuthLoginService],
})
export class AuthModule {}
