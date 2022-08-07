import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from '../model/user.model'
import { UsersRepository } from './users.repository'
import { TodoRepository } from './todo.repository'
import { TodoModel } from '../model/todo.model'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, TodoModel])],
  providers: [UsersRepository, TodoRepository],
  exports: [UsersRepository, TodoRepository],
})
export class RepositoryModule {}
