import { Title } from './value-object/title'
import { Content } from './value-object/content'

/**
 * Todo エンティティクラス
 */
export class Todo {
  private readonly id: number
  private title: Title
  private content: Content
  private readonly createdAt: Date
  private readonly updatedAt: Date

  constructor(
    id: number,
    title: Title,
    content: Content,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id
    this.title = title
    this.content = content
    this.createdAt = createdAt
    this.updatedAt = updatedAt
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

  setTitle(title: Title) {
    this.title = title
  }

  setContent(content: Content) {
    this.content = content
  }
}
