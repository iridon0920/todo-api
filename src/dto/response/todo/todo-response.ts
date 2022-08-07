/**
 * Todo作成、更新エンドポイントのレスポンスデータ構造
 */
export interface TodoResponse {
  id: string
  title: string
  content: string
  userId: string
}
