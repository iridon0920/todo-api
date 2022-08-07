import { User } from '../user/user'
import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * TOdoのタイトルの最大文字数
 */
const TODO_TITLE_LENGTH_LIMIT = 500

/**
 * Todoの内容の最大文字数
 */
const TODO_CONTENT_LENGTH_LIMIT = 15000
/**
 * Todoエンティティクラス
 */
export class Todo {
  private readonly id: number
  private title: string
  private content: string
  private readonly createdAt: Date
  private readonly updatedAt: Date
  private readonly user: User

  constructor(
    id: number,
    title: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    user: User,
  ) {
    if (title.length > TODO_TITLE_LENGTH_LIMIT) {
      throw new HttpException(
        `Todoのタイトルの長さは${TODO_TITLE_LENGTH_LIMIT.toLocaleString()}文字以内にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }
    if (content.length > TODO_CONTENT_LENGTH_LIMIT) {
      throw new HttpException(
        `Todoの内容の長さは${TODO_CONTENT_LENGTH_LIMIT.toLocaleString()}文字以内にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }

    this.id = id
    this.title = title
    this.content = content
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.user = user
  }

  getId() {
    return this.id
  }

  getTitle() {
    return this.title
  }

  getContent() {
    return this.content
  }

  getCreatedAt() {
    return this.createdAt
  }

  getUpdatedAt() {
    return this.updatedAt
  }

  getUser() {
    return this.user
  }

  changeTitle(title: string) {
    this.title = title
  }

  changeContent(content: string) {
    this.content = content
  }
}
