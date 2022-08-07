import { Todo } from './todo'
import { format } from 'date-fns'
import { User } from '../user/user'
import { Email } from '../user/value-object/email'

describe('Todoエンティティ', () => {
  // 各テスト共通で使うUser生成
  const user = new User(1, new Email('test@example.com'), '田中　太郎')

  it('コンストラクタから値をセットして、各値を参照できる', () => {
    const todo = new Todo(
      1,
      'タスクA',
      '説明文',
      new Date('2022-07-15'),
      new Date('2022-08-04'),
      user,
    )

    expect(todo.getId()).toBe(1)
    expect(todo.getTitle()).toBe('タスクA')
    expect(todo.getContent()).toBe('説明文')
    expect(format(todo.getCreatedAt(), 'yyyy-MM-dd')).toBe('2022-07-15')
    expect(format(todo.getUpdatedAt(), 'yyyy-MM-dd')).toBe('2022-08-04')
    expect(todo.getUser().getName()).toBe('田中　太郎')
  })

  it('タイトルと内容は値を変更できる', () => {
    const todo = new Todo(
      2,
      'タスクB',
      '説明文説明文',
      new Date('2022-07-15'),
      new Date('2022-08-04'),
      user,
    )

    todo.changeTitle('タスクC')
    todo.changeContent('説明文説明文説明文')

    expect(todo.getTitle()).toBe('タスクC')
    expect(todo.getContent()).toBe('説明文説明文説明文')
  })

  it('タイトルに長さが501文字以上の文字列をセットしようとすると例外', () => {
    const str = 'a'.repeat(501)
    expect(
      () =>
        new Todo(
          1,
          str,
          '説明文説明文説明文',
          new Date('2022-07-15'),
          new Date('2022-08-04'),
          user,
        ),
    ).toThrow('Todoのタイトルの長さは500文字以内にしてください。')
  })

  it('内容に長さが15,001文字以上の文字列をセットしようとすると例外', () => {
    const str = 'a'.repeat(15001)
    expect(
      () =>
        new Todo(
          1,
          'タスクB',
          str,
          new Date('2022-07-15'),
          new Date('2022-08-04'),
          user,
        ),
    ).toThrow('Todoの内容の長さは15,000文字以内にしてください。')
  })
})
