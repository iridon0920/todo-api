import { Module } from '@nestjs/common'
import { RepositoryModule } from '../repository/repository.module'
import { CreateUserService } from './user/create-user.service'
import { UpdateUserService } from './user/update-user.service'
import { DeleteUserService } from './user/delete-user.service'
import { CreateTodoService } from './todo/create-todo.service'
import { UpdateTodoService } from './todo/update-todo.service'
import { GetTodoService } from './todo/get-todo.service'
import { DeleteTodoService } from './todo/delete-todo.service'
import { SearchTodoService } from './todo/search-todo.service'
import { GetUserService } from './users/get-user.service'
import { GetAllUsersService } from './users/get-all-users.service'

@Module({
  imports: [RepositoryModule],
  providers: [
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
    GetUserService,
    GetAllUsersService,
    CreateTodoService,
    UpdateTodoService,
    GetTodoService,
    DeleteTodoService,
    SearchTodoService,
  ],
  exports: [
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
    GetUserService,
    GetAllUsersService,
    CreateTodoService,
    UpdateTodoService,
    GetTodoService,
    DeleteTodoService,
    SearchTodoService,
  ],
})
export class ServiceModule {}
