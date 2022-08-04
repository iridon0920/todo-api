import { UserName } from './user-name'

describe('UserName(ユーザ名', () => {
  it('ユーザ名をセットして、その値を文字列として取得', () => {
    const userName = new UserName('田中　太郎')
    expect(userName.toString()).toBe('田中　太郎')
  })

  it('長さが30文字までの文字列がセットできる', () => {
    const str = 'a'.repeat(30)
    const title = new UserName(str)
    expect(title.toString()).toBe(str)
  })

  it('長さが31文字以上の文字列をセットしようとすると例外', () => {
    const str = 'a'.repeat(31)
    expect(() => new UserName(str)).toThrow(
      'ユーザ名の長さは30文字以内にしてください。',
    )
  })
})
