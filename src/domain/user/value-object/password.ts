import * as bcrypt from 'bcrypt'

/**
 * パスワードの最低文字数
 */
const PASSWORD_LENGTH_LOW_LIMIT = 8

export class Password {
  private readonly value: string

  constructor(value: string) {
    if (value.length < PASSWORD_LENGTH_LOW_LIMIT) {
      throw new Error(
        `パスワードの長さは${PASSWORD_LENGTH_LOW_LIMIT}文字以上にしてください。`,
      )
    }
    this.value = value
  }

  getHash() {
    return bcrypt.hash(this.value, 10)
  }
}
