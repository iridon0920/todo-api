import { HttpException, HttpStatus } from '@nestjs/common'

// タイトルの最低文字数
const TODO_TITLE_LENGTH_LOW_LIMIT = 1
// タイトルの最大文字数
const TODO_TITLE_LENGTH_LIMIT = 500

// 内容の最低文字数
const TODO_CONTENT_LENGTH_LOW_LIMIT = 1
// 内容の最大文字数
const TODO_CONTENT_LENGTH_LIMIT = 15000

/**
 * Todoエンティティクラス
 */
export class Todo {
  private readonly id: string
  private title: string
  private content: string
  private readonly userId: string

  constructor(id: string, title: string, content: string, userId: string) {
    this.validateValue(title, content)

    this.id = id
    this.title = title
    this.content = content
    this.userId = userId
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

  getUserId() {
    return this.userId
  }

  changeTitle(title: string) {
    this.title = title
  }

  changeContent(content: string) {
    this.content = content
  }

  private validateValue(title: string, content: string) {
    if (title.length < TODO_TITLE_LENGTH_LOW_LIMIT) {
      throw new HttpException(
        `Todoのタイトルの長さは${TODO_TITLE_LENGTH_LOW_LIMIT.toLocaleString()}文字以上にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }
    if (title.length > TODO_TITLE_LENGTH_LIMIT) {
      throw new HttpException(
        `Todoのタイトルの長さは${TODO_TITLE_LENGTH_LIMIT.toLocaleString()}文字以内にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }
    if (content.length < TODO_CONTENT_LENGTH_LOW_LIMIT) {
      throw new HttpException(
        `Todoの内容の長さは${TODO_CONTENT_LENGTH_LOW_LIMIT.toLocaleString()}文字以上にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }
    if (content.length > TODO_CONTENT_LENGTH_LIMIT) {
      throw new HttpException(
        `Todoの内容の長さは${TODO_CONTENT_LENGTH_LIMIT.toLocaleString()}文字以内にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
