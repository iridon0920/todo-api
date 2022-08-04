const TODO_CONTENT_LIMIT = 15000

export class Content {
  private readonly value: string

  constructor(value: string) {
    if (value.length > TODO_CONTENT_LIMIT) {
      throw new Error(
        `Todoの内容の長さは${TODO_CONTENT_LIMIT.toLocaleString()}文字以内にしてください。`,
      )
    }
    this.value = value
  }

  toString() {
    return this.value
  }
}
