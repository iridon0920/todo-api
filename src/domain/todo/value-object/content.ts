/**
 * Todoの内容の最大文字数
 */
import { HttpException, HttpStatus } from '@nestjs/common'

const TODO_CONTENT_LENGTH_LIMIT = 15000

export class Content {
  private readonly value: string

  constructor(value: string) {
    if (value.length > TODO_CONTENT_LENGTH_LIMIT) {
      throw new HttpException(
        `Todoの内容の長さは${TODO_CONTENT_LENGTH_LIMIT.toLocaleString()}文字以内にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }
    this.value = value
  }

  toString() {
    return this.value
  }
}
