import { Module } from '@nestjs/common'
import { RepositoryModule } from '../repository/repository.module'
import { CreateUserService } from './user/create-user.service'
import { UpdateUserService } from './user/update-user.service'
import { DeleteUserService } from './user/delete-user.service'
import { CreateTodoService } from './todo/create-todo.service'
import { UpdateTodoService } from './todo/update-todo.service'

@Module({
  imports: [RepositoryModule],
  providers: [
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
    CreateTodoService,
    UpdateTodoService,
  ],
  exports: [
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
    CreateTodoService,
    UpdateTodoService,
  ],
})
export class ServiceModule {}
