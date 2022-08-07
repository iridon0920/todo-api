import { InjectRepository } from '@nestjs/typeorm'
import { TodoModel } from '../model/todo.model'
import { Repository } from 'typeorm'
import { Todo } from '../domain/todo/todo'
import { convertToTodoModel } from '../domain/todo/function/convert-to-todo-model'

export class TodoRepository {
  constructor(
    @InjectRepository(TodoModel)
    private readonly repository: Repository<TodoModel>,
  ) {}

  async save(todo: Todo) {
    const todoModel = convertToTodoModel(todo)

    await this.repository.save(todoModel)
  }

  count() {
    return this.repository.count()
  }
}
