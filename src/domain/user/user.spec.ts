import { User } from './user'
import { UserName } from './value-object/user-name'
import { Email } from './value-object/email'

describe('ユーザエンティティ', () => {
  it('コンストラクタから値をセットして、各値を参照できる', () => {
    const user = new User(
      1,
      new Email('test@example.com'),
      new UserName('田中　太郎'),
    )

    expect(user.getId()).toBe(1)
    expect(user.getEmail().toString()).toBe('test@example.com')
    expect(user.getName().toString()).toBe('田中　太郎')
  })

  it('ユーザ名は値を変更できる', () => {
    const user = new User(
      2,
      new Email('shiken@example.com'),
      new UserName('鈴木　次郎'),
    )

    user.changeName(new UserName('鈴木　ジロウ'))
    expect(user.getName().toString()).toBe('鈴木　ジロウ')
  })
})
