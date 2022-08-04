/**
 * ユーザ名の最大文字数
 */
const USER_NAME_LENGTH_LIMIT = 30

export class UserName {
  private readonly value: string

  constructor(value: string) {
    if (value.length > USER_NAME_LENGTH_LIMIT) {
      throw new Error(
        `ユーザ名の長さは${USER_NAME_LENGTH_LIMIT}文字以内にしてください。`,
      )
    }
    this.value = value
  }

  toString() {
    return this.value
  }
}
