import { Password } from './password'
import * as bcrypt from 'bcrypt'

describe('Password', () => {
  it('セットした平文パスワードをハッシュ化したパスワードを取得', async () => {
    const plainPassword = 'password'
    const password = new Password(plainPassword)

    const hash = await password.getHash()
    expect(bcrypt.compare(plainPassword, hash)).toBeTruthy()
  })

  it('長さが7文字以下の文字列をセットしようとすると例外', () => {
    expect(() => new Password('1234567')).toThrow(
      'パスワードの長さは8文字以上にしてください。',
    )
  })
})
