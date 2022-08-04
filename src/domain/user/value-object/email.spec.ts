import { Email } from './email'

describe('Email(メールアドレス)', () => {
  it('メールアドレスをセットして、その値を文字列として取得', () => {
    const email = new Email('test@example.com')
    expect(email.toString()).toBe('test@example.com')
  })

  it('全体の長さが256文字までのメールアドレスがセットできる', () => {
    const str = 'a'.repeat(51) + '@' + 'b'.repeat(200) + '.com'
    const email = new Email(str)
    expect(email.toString()).toBe(str)
  })

  it('ローカル部分の長さが64文字までのメールアドレスがセットできる', () => {
    const str = 'a'.repeat(64) + '@example.com'
    const email = new Email(str)
    expect(email.toString()).toBe(str)
  })

  it('ドメイン部分の長さが253文字までのメールアドレスがセットできる', () => {
    const str = 'a@' + 'a'.repeat(249) + '.com'
    const email = new Email(str)
    expect(email.toString()).toBe(str)
  })

  it('全体の長さが257文字以上のメールアドレスをセットすると例外', () => {
    const str = 'a'.repeat(52) + '@' + 'b'.repeat(200) + '.com'
    expect(() => new Email(str)).toThrow(
      'メールアドレスの長さは256文字以内にしてください。',
    )
  })

  it('ローカル部分の長さが65文字以上のメールアドレスをセットすると例外', () => {
    const str = 'a'.repeat(65) + '@example.com'
    expect(() => new Email(str)).toThrow(
      'メールアドレスのローカル部分の長さは64文字以内にしてください。',
    )
  })

  it('ドメイン部分の長さが254文字以上のメールアドレスをセットすると例外', () => {
    const str = 'a@' + 'a'.repeat(250) + '.com'
    expect(() => new Email(str)).toThrow(
      'メールアドレスのドメイン部分の長さは253文字以内にしてください。',
    )
  })

  it('メールアドレスの形式が正しくない場合は例外', () => {
    const errorMessage = 'メールアドレスの形式が正しくありません。'
    expect(() => new Email('test')).toThrow(errorMessage)
    expect(() => new Email('test..@example.com')).toThrow(errorMessage)
    expect(() => new Email('test@ex@mple.com')).toThrow(errorMessage)
    expect(() => new Email('te#st@example.com')).toThrow(errorMessage)
  })
})
