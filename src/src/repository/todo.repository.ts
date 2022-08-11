import { Todo } from '../domain/todo/todo'
import { HttpException, HttpStatus } from '@nestjs/common'
import { SearchTodoParam } from '../dto/request/todo/search-todo-param'
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb'
import { documentClient } from './function/db-client'
import { TODOS_TABLE_NAME } from './function/create-dynamo-local-table'
import { TodoModel } from './model/todo.model'

export class TodoRepository {
  async findByParam(param: SearchTodoParam) {
    const command = new ScanCommand({
      TableName: TODOS_TABLE_NAME,
    })
    const output = await documentClient.send(command)
    const todoModels = output.Items as TodoModel[]

    return todoModels
      .filter((todo) => {
        if (param.userId) {
          return todo.userId === param.userId
        }
        return true
      })
      .filter((todo) => {
        if (param.title) {
          return todo.title.includes(param.title)
        }
        return true
      })
      .map((todoModel) => {
        return new Todo(
          todoModel.id,
          todoModel.title,
          todoModel.content,
          todoModel.userId,
        )
      })
  }

  async findById(todoId: string) {
    const command = new GetCommand({
      TableName: TODOS_TABLE_NAME,
      Key: {
        id: todoId,
      },
    })
    const output = await documentClient.send(command)
    if (output.Item === undefined) {
      throw new HttpException('Todoが見つかりません。', HttpStatus.NOT_FOUND)
    }

    const todoModel = output.Item as TodoModel
    return new Todo(
      todoModel.id,
      todoModel.title,
      todoModel.content,
      todoModel.userId,
    )
  }

  async create(todo: Todo) {
    const command = new PutCommand({
      TableName: TODOS_TABLE_NAME,
      Item: {
        id: todo.getId(),
        title: todo.getTitle(),
        content: todo.getContent(),
        userId: todo.getUserId(),
      },
    })

    await documentClient.send(command)
  }

  async update(todo: Todo) {
    const command = new UpdateCommand({
      TableName: TODOS_TABLE_NAME,
      Key: {
        id: todo.getId(),
      },
      UpdateExpression: 'Set title = :title, content = :content',
      ExpressionAttributeValues: {
        ':title': todo.getTitle(),
        ':content': todo.getContent(),
      },
    })

    await documentClient.send(command)
  }

  async delete(todoId: string) {
    const command = new DeleteCommand({
      TableName: TODOS_TABLE_NAME,
      Key: {
        id: todoId,
      },
    })

    await documentClient.send(command)
  }
}
