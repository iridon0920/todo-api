import { Module } from '@nestjs/common'
import { UserController } from './userController'
import { ServiceModule } from '../service/service.module'
import { AuthController } from './auth.controller'
import { AuthModule } from '../auth/auth.module'
import { TodosController } from './todos.controller'

@Module({
  imports: [ServiceModule, AuthModule],
  controllers: [UserController, AuthController, TodosController],
})
export class ControllerModule {}
