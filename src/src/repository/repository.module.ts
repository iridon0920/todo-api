import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from '../model/user.model'
import { UserRepository } from './user.repository'
import { TodoRepository } from './todo.repository'
import { TodoModel } from '../model/todo.model'

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, TodoModel])],
  providers: [UserRepository, TodoRepository],
  exports: [UserRepository, TodoRepository],
})
export class RepositoryModule {}
