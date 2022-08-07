/**
 * Todo作成、更新エンドポイントのレスポンスデータ構造
 */
export interface TodoResponse {
  id: number
  title: string
  content: string
  userId: number
}
