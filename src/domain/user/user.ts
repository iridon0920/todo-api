import { UserName } from './value-object/user-name'
import { Email } from './value-object/email'

/**
 * ユーザエンティティクラス
 */
export class User {
  private readonly id: number
  private readonly email: Email
  private name: UserName

  constructor(id: number, email: Email, name: UserName) {
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

  changeName(name: UserName) {
    this.name = name
  }
}
