import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { ServiceModule } from '../service/service.module'
import { AuthController } from './auth.controller'
import { AuthModule } from '../auth/auth.module'
import { TodosController } from './todos.controller'
import { UsersController } from './users.controller'

@Module({
  imports: [ServiceModule, AuthModule],
  controllers: [
    UserController,
    UsersController,
    AuthController,
    TodosController,
  ],
})
export class ControllerModule {}
