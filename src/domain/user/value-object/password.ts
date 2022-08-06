import * as bcrypt from 'bcrypt'
import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * パスワードの最低文字数
 */
const PASSWORD_LENGTH_LOW_LIMIT = 8

export class Password {
  private readonly value: string

  constructor(value: string) {
    if (value.length < PASSWORD_LENGTH_LOW_LIMIT) {
      throw new HttpException(
        `パスワードの長さは${PASSWORD_LENGTH_LOW_LIMIT}文字以上にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }
    this.value = value
  }

  getHash() {
    return bcrypt.hash(this.value, 10)
  }
}
