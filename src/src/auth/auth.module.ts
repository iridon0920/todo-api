import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { AuthLoginService } from './auth-login.service'
import { JwtStrategy } from './jwt.strategy'
import { RepositoryModule } from '../repository/repository.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      // 認証JWT有効期限
      signOptions: { expiresIn: '1d' },
    }),
    RepositoryModule,
  ],
  providers: [AuthLoginService, JwtStrategy],
  exports: [AuthLoginService],
})
export class AuthModule {}
