import { UserName } from './value-object/user-name'
import { Email } from './value-object/email'

/**
 * ユーザエンティティクラス
 */
export class User {
  private readonly id: number
  private email: Email
  private name: UserName
  private readonly createdAt: Date
  private readonly updatedAt: Date

  constructor(
    id: number,
    email: Email,
    name: UserName,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id
    this.email = email
    this.name = name
    this.createdAt = createdAt
    this.updatedAt = updatedAt
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

  getCreatedAt() {
    return this.createdAt
  }

  getUpdatedAt() {
    return this.updatedAt
  }

  changeEmail(email: Email) {
    this.email = email
  }

  changeName(name: UserName) {
    this.name = name
  }
}
