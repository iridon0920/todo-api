import { Title } from './value-object/title'
import { Content } from './value-object/content'
import { User } from '../user/user'

/**
 * Todoエンティティクラス
 */
export class Todo {
  private readonly id: number
  private title: Title
  private content: Content
  private readonly createdAt: Date
  private readonly updatedAt: Date
  private readonly user: User

  constructor(
    id: number,
    title: Title,
    content: Content,
    createdAt: Date,
    updatedAt: Date,
    user: User,
  ) {
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

  changeTitle(title: Title) {
    this.title = title
  }

  changeContent(content: Content) {
    this.content = content
  }
}
