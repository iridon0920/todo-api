import { Module } from '@nestjs/common'
import { UserController } from './userController'
import { ServiceModule } from '../service/service.module'
import { AuthController } from './auth.controller'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [ServiceModule, AuthModule],
  controllers: [UserController, AuthController],
})
export class ControllerModule {}
