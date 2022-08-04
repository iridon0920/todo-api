import { Content } from './content'

describe('Content(Todoの内容)', () => {
  it('内容をセットして、その値を文字列として取得', () => {
    const content = new Content('説明文')
    expect(content.toString()).toBe('説明文')
  })

  it('長さが15,000文字までの文字列がセットできる', () => {
    const str = 'a'.repeat(15000)
    const content = new Content(str)
    expect(content.toString()).toBe(str)
  })

  it('長さが15,001文字以上の文字列をセットしようとすると例外', () => {
    const str = 'a'.repeat(15001)
    expect(() => new Content(str)).toThrow(Error)
  })
})
