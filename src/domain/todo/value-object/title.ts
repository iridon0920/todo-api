/**
 * TOdoのタイトルの最大文字数
 */
import { HttpException, HttpStatus } from '@nestjs/common'

const TODO_TITLE_LENGTH_LIMIT = 500

export class Title {
  private readonly value: string

  constructor(value: string) {
    if (value.length > TODO_TITLE_LENGTH_LIMIT) {
      throw new HttpException(
        `Todoのタイトルの長さは${TODO_TITLE_LENGTH_LIMIT.toLocaleString()}文字以内にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }
    this.value = value
  }

  toString() {
    return this.value
  }
}
