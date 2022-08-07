import { Module } from '@nestjs/common'
import { RepositoryModule } from '../repository/repository.module'
import { CreateUserService } from './user/create-user.service'
import { UpdateUserService } from './user/update-user.service'
import { DeleteUserService } from './user/delete-user.service'
import { CreateTodoService } from './todo/create-todo.service'

@Module({
  imports: [RepositoryModule],
  providers: [
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
    CreateTodoService,
  ],
  exports: [
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
    CreateTodoService,
  ],
})
export class ServiceModule {}
