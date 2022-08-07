import { HttpException, HttpStatus } from '@nestjs/common'
import { Email } from './value-object/email'

// ユーザ名の最低文字数
const USER_NAME_LENGTH_LOW_LIMIT = 1

// ユーザ名の最大文字数
const USER_NAME_LENGTH_LIMIT = 30

/**
 * ユーザエンティティクラス
 */
export class User {
  private readonly id: number
  private readonly email: Email
  private name: string

  constructor(id: number, email: Email, name: string) {
    this.validateValues(name)

    this.id = id
    this.email = email
    this.name = name
  }

  getId() {
    return this.id
  }

  getEmail() {
    return this.email
  }

  getName() {
    return this.name
  }

  changeName(name: string) {
    this.name = name
  }

  private validateValues(name: string) {
    if (name.length < USER_NAME_LENGTH_LOW_LIMIT) {
      throw new HttpException(
        `ユーザ名の長さは${USER_NAME_LENGTH_LOW_LIMIT}文字以上にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }
    if (name.length > USER_NAME_LENGTH_LIMIT) {
      throw new HttpException(
        `ユーザ名の長さは${USER_NAME_LENGTH_LIMIT}文字以内にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
