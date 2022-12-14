import { User } from './user'
import { Email } from './value-object/email'

describe('ユーザエンティティ', () => {
  it('コンストラクタから値をセットして、各値を参照できる', () => {
    const user = new User('111', new Email('test@example.com'), '田中　太郎')

    expect(user.getId()).toBe('111')
    expect(user.getEmail().toString()).toBe('test@example.com')
    expect(user.getName()).toBe('田中　太郎')
  })

  it('名前に空文字をセットしようとすると例外', () => {
    expect(() => new User('111', new Email('test@example.com'), '')).toThrow(
      'ユーザ名の長さは1文字以上にしてください。',
    )
  })

  it('名前に長さが31文字以上の文字列をセットしようとすると例外', () => {
    const str = 'a'.repeat(31)
    expect(() => new User('111', new Email('test@example.com'), str)).toThrow(
      'ユーザ名の長さは30文字以内にしてください。',
    )
  })

  it('ユーザ名は値を変更できる', () => {
    const user = new User('222', new Email('shiken@example.com'), '鈴木　次郎')

    user.changeName('鈴木　ジロウ')
    expect(user.getName()).toBe('鈴木　ジロウ')
  })
})
