import { User } from '../domain/user/user'
import { Password } from '../domain/user/value-object/password'
import { HttpException, HttpStatus } from '@nestjs/common'
import { Email } from '../domain/user/value-object/email'
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb'
import { documentClient } from './function/db-client'
import { TABLE_NAME } from './function/create-dynamo-local-table'
import { UserModel } from './model/user.model'

export const USER_SK = 'User'

export class UserRepository {
  async findAll() {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
    })
    const output = await documentClient.send(command)

    if (output.Items === undefined) {
      return []
    }

    const userModels = output.Items.filter(
      (item) => item.sk === USER_SK,
    ) as UserModel[]

    return userModels.map(
      (userModel) =>
        new User(userModel.pk, new Email(userModel.email), userModel.name),
    )
  }

  async findById(userId: string) {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: userId,
        sk: USER_SK,
      },
    })
    const output = await documentClient.send(command)

    if (output.Item === undefined) {
      throw new HttpException('ユーザが見つかりません。', HttpStatus.NOT_FOUND)
    }

    const userModel = output.Item as UserModel
    return new User(userModel.pk, new Email(userModel.email), userModel.name)
  }

  async findHashPasswordById(userId: string): Promise<string | undefined> {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: userId,
        sk: USER_SK,
      },
    })
    const output = await documentClient.send(command)
    return output.Item ? output.Item.password : undefined
  }

  async create(user: User, password: Password) {
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        pk: user.getId(),
        sk: USER_SK,
        email: user.getEmail().toString(),
        name: user.getName(),
        password: await password.getHash(),
      },
    })

    await documentClient.send(command)
  }

  async update(user: User) {
    const command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        pk: user.getId(),
        sk: USER_SK,
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
      TableName: TABLE_NAME,
      Key: {
        pk: userId,
        sk: USER_SK,
      },
    })

    await documentClient.send(command)
  }

  async findEmailCount(email: string) {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: 'EmailIndex',
      KeyConditionExpression: '#indexKey = :indexValue',
      ExpressionAttributeNames: {
        '#indexKey': 'email',
      },
      ExpressionAttributeValues: {
        ':indexValue': email,
      },
    })

    const result = await documentClient.send(command)
    return result.Count ? result.Count : 0
  }
}
