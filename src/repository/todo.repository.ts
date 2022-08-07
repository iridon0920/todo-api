import { InjectRepository } from '@nestjs/typeorm'
import { TodoModel } from '../model/todo.model'
import { Repository } from 'typeorm'
import { Todo } from '../domain/todo/todo'
import { convertToTodoModel } from '../domain/todo/function/convert-to-todo-model'
import { HttpException, HttpStatus } from '@nestjs/common'

export class TodoRepository {
  constructor(
    @InjectRepository(TodoModel)
    private readonly repository: Repository<TodoModel>,
  ) {}

  async findById(todoId: number) {
    const todoModel = await this.repository.findOne({
      where: { id: todoId },
      relations: ['user'],
    })

    if (todoModel === null) {
      throw new HttpException('Todoが見つかりません。', HttpStatus.NOT_FOUND)
    }

    return new Todo(
      todoModel.id,
      todoModel.title,
      todoModel.content,
      todoModel.userId,
    )
  }

  async save(todo: Todo) {
    const todoModel = convertToTodoModel(todo)

    await this.repository.save(todoModel)
  }

  async delete(todoId: number) {
    await this.repository.delete(todoId)
  }

  count() {
    return this.repository.count()
  }
}
