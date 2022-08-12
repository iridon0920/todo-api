import { Todo } from '../domain/todo/todo'
import { HttpException, HttpStatus } from '@nestjs/common'
import { SearchTodoParam } from '../dto/request/todo/search-todo-param'
import {
  DeleteCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb'
import { documentClient } from './function/db-client'
import { TodoModel } from './model/todo.model'
import { TABLE_NAME } from './function/create-dynamo-local-table'
import { USER_SK } from './user.repository'

export class TodoRepository {
  async findByParam(param: SearchTodoParam) {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
    })
    const output = await documentClient.send(command)

    if (output.Items === undefined) {
      return []
    }

    const todoModels = output.Items.filter(
      (item) => item.sk !== USER_SK,
    ) as TodoModel[]

    return todoModels
      .filter((todo) => {
        if (param.userId) {
          return todo.sk === param.userId
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
          todoModel.pk,
          todoModel.title,
          todoModel.content,
          todoModel.sk,
        )
      })
  }

  async findById(todoId: string) {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pk = :todoId',
      ExpressionAttributeValues: {
        ':todoId': todoId,
      },
    })
    const output = await documentClient.send(command)
    if (output.Items === undefined) {
      throw new HttpException('Todoが見つかりません。', HttpStatus.NOT_FOUND)
    }

    const todoModel = output.Items[0] as TodoModel
    return new Todo(
      todoModel.pk,
      todoModel.title,
      todoModel.content,
      todoModel.sk,
    )
  }

  async create(todo: Todo) {
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        pk: todo.getId(),
        title: todo.getTitle(),
        content: todo.getContent(),
        sk: todo.getUserId(),
      },
    })

    await documentClient.send(command)
  }

  async update(todo: Todo, userId) {
    const command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: todo.getId(),
        sk: userId,
      },
      UpdateExpression: 'Set title = :title, content = :content',
      ExpressionAttributeValues: {
        ':title': todo.getTitle(),
        ':content': todo.getContent(),
      },
    })

    await documentClient.send(command)
  }

  async delete(todoId: string, userId) {
    const command = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: todoId,
        sk: userId,
      },
    })

    await documentClient.send(command)
  }
}
