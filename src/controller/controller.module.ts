import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { ServiceModule } from '../service/service.module'
import { AuthController } from './auth.controller'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [ServiceModule, AuthModule],
  controllers: [UsersController, AuthController],
})
export class ControllerModule {}
