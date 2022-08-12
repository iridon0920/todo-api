import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { TodoRepository } from '../../repository/todo.repository'
import { UpdateTodoParam } from '../../dto/request/todo/update-todo-param'

@Injectable()
export class UpdateTodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(todoId: string, param: UpdateTodoParam, userId: string) {
    const todo = await this.todoRepository.findById(todoId)

    if (todo.getUserId() !== userId) {
      throw new HttpException(
        '他のユーザのTodoは編集できません。',
        HttpStatus.UNAUTHORIZED,
      )
    }

    if (param.title) {
      todo.changeTitle(param.title)
    }
    if (param.content) {
      todo.changeContent(param.content)
    }

    await this.todoRepository.update(todo, userId)

    return todo
  }
}
