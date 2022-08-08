import { Injectable } from '@nestjs/common'
import { TodoRepository } from '../../repository/todo.repository'
import { CreateTodoParam } from '../../dto/request/todo/create-todo-param'
import { Todo } from '../../domain/todo/todo'
import { UserRepository } from '../../repository/user.repository'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class CreateTodoService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(userId: string, param: CreateTodoParam) {
    const todo = new Todo(uuidv4(), param.title, param.content, userId)

    await this.todoRepository.save(todo)

    return todo
  }
}
