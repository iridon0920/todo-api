import { format } from 'date-fns'
import { User } from './user'
import { UserName } from './value-object/user-name'
import { Email } from './value-object/email'

describe('ユーザエンティティ', () => {
  it('コンストラクタから値をセットして、各値を参照できる', () => {
    const user = new User(
      1,
      new Email('test@example.com'),
      new UserName('田中　太郎'),
      new Date('2022-07-15'),
      new Date('2022-08-04'),
    )

    expect(user.getId()).toBe(1)
    expect(user.getEmail().toString()).toBe('test@example.com')
    expect(user.getName().toString()).toBe('田中　太郎')
    expect(format(user.getCreatedAt(), 'yyyy-MM-dd')).toBe('2022-07-15')
    expect(format(user.getUpdatedAt(), 'yyyy-MM-dd')).toBe('2022-08-04')
  })

  it('メールアドレスとユーザ名は値を変更できる', () => {
    const user = new User(
      2,
      new Email('shiken@example.com'),
      new UserName('鈴木　次郎'),
      new Date('2022-07-15'),
      new Date('2022-08-04'),
    )

    user.changeEmail(new Email('check@example.com'))
    user.changeName(new UserName('鈴木　ジロウ'))

    expect(user.getEmail().toString()).toBe('check@example.com')
    expect(user.getName().toString()).toBe('鈴木　ジロウ')
  })
})
