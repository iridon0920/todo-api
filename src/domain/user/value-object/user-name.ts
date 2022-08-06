/**
 * ユーザ名の最大文字数
 */
import { HttpException, HttpStatus } from '@nestjs/common'

const USER_NAME_LENGTH_LIMIT = 30

export class UserName {
  private readonly value: string

  constructor(value: string) {
    if (value.length > USER_NAME_LENGTH_LIMIT) {
      throw new HttpException(
        `ユーザ名の長さは${USER_NAME_LENGTH_LIMIT}文字以内にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }
    this.value = value
  }

  toString() {
    return this.value
  }
}
