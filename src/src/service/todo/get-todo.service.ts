import { Injectable } from '@nestjs/common'
import { TodoRepository } from '../../repository/todo.repository'

@Injectable()
export class GetTodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(todoId: string) {
    return await this.todoRepository.findById(todoId)
  }
}
