const TODO_TITLE_LIMIT = 500

export class Title {
  private readonly value: string

  constructor(value: string) {
    if (value.length > TODO_TITLE_LIMIT) {
      throw new Error(
        `Todoのタイトルの長さは${TODO_TITLE_LIMIT.toLocaleString()}文字以内にしてください。`,
      )
    }
    this.value = value
  }

  toString() {
    return this.value
  }
}
