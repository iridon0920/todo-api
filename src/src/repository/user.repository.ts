import { User } from '../domain/user/user'
import { Password } from '../domain/user/value-object/password'
import { HttpException, HttpStatus } from '@nestjs/common'
import { Email } from '../domain/user/value-object/email'
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb'
import { documentClient } from './function/db-client'
import { USERS_TABLE_NAME } from './function/create-dynamo-local-table'
import { UserModel } from './model/user.model'

export class UserRepository {
  async findById(userId: string) {
    const command = new GetCommand({
      TableName: USERS_TABLE_NAME,
      Key: {
        id: userId,
      },
    })
    const output = await documentClient.send(command)

    if (output.Item === undefined) {
      throw new HttpException('ユーザが見つかりません。', HttpStatus.NOT_FOUND)
    }

    const userModel = output.Item as UserModel
    return new User(userModel.id, new Email(userModel.email), userModel.name)
  }

  async findHashPasswordById(userId: string): Promise<string | undefined> {
    const command = new GetCommand({
      TableName: USERS_TABLE_NAME,
      Key: {
        id: userId,
      },
    })
    const output = await documentClient.send(command)
    return output.Item ? output.Item.password : undefined
  }

  async create(user: User, password: Password) {
    const command = new PutCommand({
      TableName: USERS_TABLE_NAME,
      Item: {
        id: user.getId(),
        email: user.getEmail().toString(),
        name: user.getName(),
        password: await password.getHash(),
      },
    })

    await documentClient.send(command)
  }

  async update(user: User) {
    const command = new UpdateCommand({
      TableName: USERS_TABLE_NAME,
      Key: {
        id: user.getId(),
      },
      UpdateExpression: 'set #n = :userName',
      ExpressionAttributeNames: {
        '#n': 'name',
      },
      ExpressionAttributeValues: {
        ':userName': user.getName(),
      },
    })

    await documentClient.send(command)
  }

  async delete(userId: string) {
    const command = new DeleteCommand({
      TableName: USERS_TABLE_NAME,
      Key: {
        id: userId,
      },
    })

    await documentClient.send(command)
  }

  async findEmailCount(email: string) {
    const command = new ScanCommand({
      TableName: USERS_TABLE_NAME,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    })

    const result = await documentClient.send(command)
    return result.Count
  }
}
