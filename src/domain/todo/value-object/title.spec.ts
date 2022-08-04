import { Title } from './title'

describe('Title(Todoのタイトル)', () => {
  it('タイトルをセットして、その値を文字列として取得', () => {
    const title = new Title('タスクA')
    expect(title.toString()).toBe('タスクA')
  })

  it('長さが500文字までの文字列がセットできる', () => {
    const str = 'a'.repeat(500)
    const title = new Title(str)
    expect(title.toString()).toBe(str)
  })

  it('長さが501文字以上の文字列をセットしようとすると例外', () => {
    const str = 'a'.repeat(501)
    expect(() => new Title(str)).toThrow(Error)
  })
})
