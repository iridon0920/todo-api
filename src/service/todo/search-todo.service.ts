import { Injectable } from '@nestjs/common'
import { TodoRepository } from '../../repository/todo.repository'
import { SearchTodoParam } from '../../dto/request/todo/search-todo-param'

@Injectable()
export class SearchTodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(param: SearchTodoParam) {
    return await this.todoRepository.findByParam(param)
  }
}
