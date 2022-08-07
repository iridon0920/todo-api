import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { TodoRepository } from '../../repository/todo.repository'

@Injectable()
export class DeleteTodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(todoId: number, userId: number) {
    const todo = await this.todoRepository.findById(todoId)
    if (todo.getUserId() !== userId) {
      throw new HttpException(
        '他のユーザのTodoは削除できません。',
        HttpStatus.UNAUTHORIZED,
      )
    }

    await this.todoRepository.delete(todoId)
  }
}
