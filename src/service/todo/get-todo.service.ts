import { Injectable } from '@nestjs/common'
import { TodoRepository } from '../../repository/todo.repository'

@Injectable()
export class GetTodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(todoId: number) {
    return await this.todoRepository.findById(todoId)
  }
}
