import { InjectRepository } from '@nestjs/typeorm'
import { TodoModel } from '../model/todo.model'
import { Repository } from 'typeorm'
import { Todo } from '../domain/todo/todo'
import { convertToTodoModel } from '../domain/todo/function/convert-to-todo-model'
import { HttpException, HttpStatus } from '@nestjs/common'
import { SearchTodoParam } from '../dto/request/todo/search-todo-param'

export class TodoRepository {
  constructor(
    @InjectRepository(TodoModel)
    private readonly repository: Repository<TodoModel>,
  ) {}

  async findByParam(param: SearchTodoParam) {
    let query = this.repository.createQueryBuilder()

    if (param.userId) {
      query = query.where('userId = :userId', { userId: param.userId })
    }
    if (param.title) {
      query = query.where('title like :title', { title: `%${param.title}%` })
    }

    const todoModels = await query.getMany()
    return todoModels.map((todoModel) => {
      return new Todo(
        todoModel.id,
        todoModel.title,
        todoModel.content,
        todoModel.userId,
      )
    })
  }

  async findById(todoId: string) {
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

  async delete(todoId: string) {
    await this.repository.delete(todoId)
  }
}
