export interface TodoModel {
  // プライマリキー
  pk: string
  // ソートキー（Userのpkが入る）
  sk: string
  title: string
  content: string
}
