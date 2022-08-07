import { Injectable } from '@nestjs/common'
import { TodoRepository } from '../../repository/todo.repository'
import { CreateTodoParam } from '../../dto/request/todo/create-todo-param'
import { Todo } from '../../domain/todo/todo'
import { UserRepository } from '../../repository/user.repository'

@Injectable()
export class CreateTodoService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly todoRepository: TodoRepository,
  ) {}

  async execute(userId: number, param: CreateTodoParam) {
    const user = await this.usersRepository.findById(userId)
    const todo = new Todo(
      await this.getNewTodoId(),
      param.title,
      param.content,
      user,
    )

    await this.todoRepository.save(todo)

    return todo
  }

  private async getNewTodoId() {
    const todosCount = await this.todoRepository.count()
    return todosCount + 1
  }
}
