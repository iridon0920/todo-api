# Todo API

## 概要

- Todo アプリから使われることを想定した REST API です。
- Todo データの作成、更新、情報取得、削除などが可能ですが、各エンドポイントへのアクセスにはトークンによる認証が必要となります。
- 認証に使用するユーザデータの作成、更新、情報取得や、作成したユーザへのログインについてもこの API から行うことができます。
- 各エンドポイントの詳細は[API 仕様ドキュメント](https://iridon0920.github.io/todo-api/api.html)を参照してください。

## ローカル環境での使用方法

### 必要環境

- Docker Compose 3.8 以上
- 3000 番ポートが使用可能な状態

### ローカルサーバ稼働手順

- `git clone`でこのリポジトリのデータをダウンロード
- `cp`コマンドなどでルートディレクトリの.env.example をコピーして.env ファイルを生成
- `docker-compose up -d`コマンド実行

### REST API の使用例

- 新規ユーザ作成

```bash
curl -L -X POST 'http://localhost:3000/user' \
    -H 'Content-Type: application/json' \
    -d '{
      "email": "example@example.com",
      "name": "test",
      "password": "password"
    }'

#レスポンス
{
    "id": "de24b624-7b97-446c-b7b6-98076590c97b", #ランダムなUUID
    "email": "example@example.com",
    "name": "test"
}
```

- ログイン

```bash
curl -L -X POST 'http://localhost:3000/auth/login' \
   -H 'Content-Type: application/json' \
   -d '{
       "userId": "de24b624-7b97-446c-b7b6-98076590c97b",
       "password": "password"
   }'

#レスポンス
{
    "access_token": "eyXXXXXX" #ランダムなトークン
}
```

* Todo作成

```bash
curl -L -X POST 'http://localhost:3000/todos' \
   -H 'Authorization: Bearer eyXXXXXX' \
   -H 'Content-Type: application/json' \
   -d '{
       "title": "牛乳を買う",
       "content": "近所のスーパーの特売日を狙うこと"
   }'

#レスポンス
{
    "id": "2c5780ff-1037-4a1f-9bcc-8a838f9c8b71", #ランダムなUUID
    "title": "牛乳を買う",
    "content": "近所のスーパーの特売日を狙うこと",
    "userId": "de24b624-7b97-446c-b7b6-98076590c97b"
}

curl -L -X POST 'http://localhost:3000/todos' \
   -H 'Authorization: Bearer eyXXXXXX' \
   -H 'Content-Type: application/json' \
   -d '{
       "title": "リーダブルコード読了",
       "content": "1日30ページ読み進めるのを目安に"
   }'

#レスポンス
{
    "id": "221ff6fb-f3f1-4e0f-b306-cc5dc64e35c9", #ランダムなUUID
    "title": "リーダブルコード読了",
    "content": "1日30ページ読み進めるのを目安に",
    "userId": "de24b624-7b97-446c-b7b6-98076590c97b"
}

curl -L -X POST 'http://localhost:3000/todos' \
   -H 'Authorization: Bearer eyXXXXXX' \
   -H 'Content-Type: application/json' \
   -d '{
       "title": "卵を買う",
       "content": "売り切れに要注意"
   }'

#レスポンス
{
    "id": "34944e7b-2e30-4893-b4fa-70ff1a646414", #ランダムなUUID
    "title": "卵を買う",
    "content": "売り切れに要注意",
    "userId": "de24b624-7b97-446c-b7b6-98076590c97b"
}
```

* Todo更新

```bash
curl -L -X PATCH 'http://localhost:3000/todos/2c5780ff-1037-4a1f-9bcc-8a838f9c8b71' \
   -H 'Authorization: Bearer eyXXXXXX' \
   -H 'Content-Type: application/json' \
   -d '{
       "title": "牛乳を2個買う"
   }'

#レスポンス
{
    "id": "2c5780ff-1037-4a1f-9bcc-8a838f9c8b71",
    "title": "牛乳を2個買う",
    "content": "近所のスーパーの特売日を狙うこと",
    "userId": "de24b624-7b97-446c-b7b6-98076590c97b"
}
```

* Todo検索

```bash
curl -L -X GET 'http://localhost:3000/todos?title=買う' \
    -H 'Authorization: Bearer eyXXXXXX'

#レスポンス
[
    {
        "id": "34944e7b-2e30-4893-b4fa-70ff1a646414",
        "title": "卵を買う",
        "content": "売り切れに要注意",
        "userId": "de24b624-7b97-446c-b7b6-98076590c97b"
    },
    {
        "id": "2c5780ff-1037-4a1f-9bcc-8a838f9c8b71",
        "title": "牛乳を2個買う",
        "content": "近所のスーパーの特売日を狙うこと",
        "userId": "de24b624-7b97-446c-b7b6-98076590c97b"
    }
]
```

* Todo削除

```bash
curl -L -X DELETE 'http://localhost:3000/todos/34944e7b-2e30-4893-b4fa-70ff1a646414' \
    -H 'Authorization: Bearer eyXXXXXX'

curl -L -X GET 'http://localhost:3000/todos?title=買う' \
    -H 'Authorization: Bearer eyXXXXXX'

#レスポンス
[
    {
        "id": "2c5780ff-1037-4a1f-9bcc-8a838f9c8b71",
        "title": "牛乳を2個買う",
        "content": "近所のスーパーの特売日を狙うこと",
        "userId": "de24b624-7b97-446c-b7b6-98076590c97b"
    }
]
```

### 自動テスト(e2eテスト)実行コマンド
```bash
docker-compose -f docker-compose.yml -f docker-compose.e2e.yml up --abort-on-container-exit
```

### 自動テスト（ユニットテスト）実行コマンド
```bash
docker-compose -f docker-compose.yml -f docker-compose.test.yml up --abort-on-container-exit
```

## AWSでの稼働

### 概要
* CLIからの操作により、AWS上でもアプリケーションを稼働させられるようにしてあります。
* インフラ環境の定義、デプロイにはAWS CDKを使用しています。
* 手動デプロイだけでなく、このリポジトリのmasterブランチにコミットがpushされるのをトリガーに、GitHub Actionsのワークフローが実行され、アプリケーションのテストとAWSへのデプロイが自動的に行われる仕組みになっています。

### 手動デプロイ手順
* AWS CLIにて認証情報を設定
* `npx cdk deploy`コマンド実行

### インフラ構成図
![](./reference/AWS%20Diagram.drawio.svg)
