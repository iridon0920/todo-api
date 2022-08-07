import { Todo } from './todo'

describe('Todoエンティティ', () => {
  it('コンストラクタから値をセットして、各値を参照できる', () => {
    const todo = new Todo('111', 'タスクA', '説明文', '222')

    expect(todo.getId()).toBe('111')
    expect(todo.getTitle()).toBe('タスクA')
    expect(todo.getContent()).toBe('説明文')
    expect(todo.getUserId()).toBe('222')
  })

  it('タイトルと内容は値を変更できる', () => {
    const todo = new Todo('222', 'タスクB', '説明文説明文', '333')

    todo.changeTitle('タスクC')
    todo.changeContent('説明文説明文説明文')

    expect(todo.getTitle()).toBe('タスクC')
    expect(todo.getContent()).toBe('説明文説明文説明文')
  })

  it('タイトルに空文字をセットしようとすると例外', () => {
    expect(() => new Todo('1', '', '説明文説明文説明文', '3')).toThrow(
      'Todoのタイトルの長さは1文字以上にしてください。',
    )
  })

  it('タイトルに長さが501文字以上の文字列をセットしようとすると例外', () => {
    const str = 'a'.repeat(501)
    expect(() => new Todo('1', str, '説明文説明文説明文', '3')).toThrow(
      'Todoのタイトルの長さは500文字以内にしてください。',
    )
  })

  it('内容に空文字をセットしようとすると例外', () => {
    expect(() => new Todo('1', 'タスクB', '', '3')).toThrow(
      'Todoの内容の長さは1文字以上にしてください。',
    )
  })

  it('内容に長さが15,001文字以上の文字列をセットしようとすると例外', () => {
    const str = 'a'.repeat(15001)
    expect(() => new Todo('1', 'タスクB', str, '3')).toThrow(
      'Todoの内容の長さは15,000文字以内にしてください。',
    )
  })
})
