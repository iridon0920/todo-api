import { Todo } from './todo'
import { Title } from './value-object/title'
import { Content } from './value-object/content'
import { format } from 'date-fns'

describe('Todoエンティティ', () => {
  it('コンストラクタから値をセットして、各値を参照できる', () => {
    const todo = new Todo(
      1,
      new Title('タスクA'),
      new Content('説明文'),
      new Date('2022-07-15'),
      new Date('2022-08-04'),
    )

    expect(todo.getId()).toBe(1)
    expect(todo.getTitle().toString()).toBe('タスクA')
    expect(todo.getContent().toString()).toBe('説明文')
    expect(format(todo.getCreatedAt(), 'yyyy-MM-dd')).toBe('2022-07-15')
    expect(format(todo.getUpdatedAt(), 'yyyy-MM-dd')).toBe('2022-08-04')
  })

  it('タイトルと内容は値を変更できる', () => {
    const todo = new Todo(
      2,
      new Title('タスクB'),
      new Content('説明文説明文'),
      new Date('2022-07-15'),
      new Date('2022-08-04'),
    )

    todo.changeTitle(new Title('タスクC'))
    todo.changeContent(new Content('説明文説明文説明文'))

    expect(todo.getTitle().toString()).toBe('タスクC')
    expect(todo.getContent().toString()).toBe('説明文説明文説明文')
  })
})
