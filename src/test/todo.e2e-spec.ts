import { INestApplication } from '@nestjs/common'
import { TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { getTestUserToken } from './function/get-test-user-token'
import { getTestModule } from './function/get-test-module'
import { getInitApp } from './function/get-init-app'
import { createDynamoLocalTable } from '../src/repository/function/create-dynamo-local-table'

describe('TodosController (e2e)', () => {
  let app: INestApplication
  let moduleFixture: TestingModule
  let jwtToken: string
  // 2つ目のユーザのトークン
  let jwtToken2: string

  let user2Id: string
  let todo1Id: string

  beforeAll(async () => {
    moduleFixture = await getTestModule()
    app = await getInitApp(moduleFixture)
    await createDynamoLocalTable()
    jwtToken = await getTestUserToken(app)
  })

  it('Todo作成 - /todos (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: 'ミルクを買う',
        content: '近所のスーパーで買うこと。',
      })
      .expect(201)

    todo1Id = response.body.id

    expect(response.body).toEqual({
      id: expect.any(String),
      title: 'ミルクを買う',
      content: '近所のスーパーで買うこと。',
      userId: expect.any(String),
    })
  })

  it('Todoの更新 - /todos/:id (PATCH)', async () => {
    // POSTのテストで作成したTodoを更新
    const response = await request(app.getHttpServer())
      .patch(`/todos/${todo1Id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: '卵を買う',
      })
      .expect(200)

    expect(response.body).toEqual({
      id: expect.any(String),
      title: '卵を買う',
      content: '近所のスーパーで買うこと。',
      userId: expect.any(String),
    })
  })

  it('Todoの更新失敗（他のユーザのTodoは更新できない） - /todos/:id (PATCH)', async () => {
    // 新規ユーザ作成
    const userResponse = await request(app.getHttpServer()).post('/user').send({
      email: 'test2@example.com',
      name: 'テスト2',
      password: 'password',
    })
    user2Id = userResponse.body.id

    // 新規ユーザのログイントークン取得
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        userId: user2Id,
        password: 'password',
      })
    jwtToken2 = loginResponse.body.access_token

    // 新規ユーザで作成済Todoの更新リクエスト
    return request(app.getHttpServer())
      .patch(`/todos/${todo1Id}`)
      .set('Authorization', `Bearer ${jwtToken2}`)
      .send({
        title: '豚肉を買う',
      })
      .expect(401)
  })

  it('Todoの参照 - /todos/:id (Get)', async () => {
    // PATCHのテストで更新したTodoを取得
    const response = await request(app.getHttpServer())
      .get(`/todos/${todo1Id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)

    expect(response.body).toEqual({
      id: expect.any(String),
      title: '卵を買う',
      content: '近所のスーパーで買うこと。',
      userId: expect.any(String),
    })
  })

  it('Todoの参照（別ユーザでも参照可能） - /todos/:id (Get)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/todos/${todo1Id}`)
      .set('Authorization', `Bearer ${jwtToken2}`)
      .expect(200)

    expect(response.body).toEqual({
      id: expect.any(String),
      title: '卵を買う',
      content: '近所のスーパーで買うこと。',
      userId: expect.any(String),
    })
  })

  it('Todoの参照失敗（認証なしでは取得不可） - /todos/:id (Get)', () => {
    return request(app.getHttpServer()).get(`/todos/${todo1Id}`).expect(401)
  })

  it('Todoの削除 - /todos/:id (Delete)', async () => {
    await request(app.getHttpServer())
      .delete(`/todos/${todo1Id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .expect({})

    // 削除したTodoを参照しようとしても失敗する
    return request(app.getHttpServer())
      .get(`/todos/${todo1Id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404)
  })

  it('Todoの削除失敗（他のユーザのTodoは削除できない） - /todos/:id (Delete)', async () => {
    // ユーザ1でタスク作成
    const response = await request(app.getHttpServer())
      .post('/todos')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: '水を買う',
        content: 'ドラッグストアで買うこと。',
      })
      .expect(201)

    // ユーザ2で削除しようとしても失敗
    const todoId = response.body.id
    await request(app.getHttpServer())
      .delete(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${jwtToken2}`)
      .expect(401)
  })

  it('Todo検索(タイトル検索) - /todos (Get)', async () => {
    // ユーザ2でタスクを2つ作成
    await request(app.getHttpServer())
      .post('/todos')
      .set('Authorization', `Bearer ${jwtToken2}`)
      .send({
        title: '水道代を払う',
        content: 'コンビニで支払うこと。',
      })
      .expect(201)
    await request(app.getHttpServer())
      .post('/todos')
      .set('Authorization', `Bearer ${jwtToken2}`)
      .send({
        title: 'ガス代を払う',
        content: 'コンビニで支払うこと。',
      })
      .expect(201)

    const response = await request(app.getHttpServer())
      .get('/todos')
      .set('Authorization', `Bearer ${jwtToken}`)
      .query({
        title: '水',
      })
      .expect(200)

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          title: '水を買う',
          content: 'ドラッグストアで買うこと。',
          userId: expect.any(String),
        },
        {
          id: expect.any(String),
          title: '水道代を払う',
          content: 'コンビニで支払うこと。',
          userId: expect.any(String),
        },
      ]),
    )
    expect(response.body.length).toEqual(2)
  })

  it('Todo検索(UserId検索) - /todos (Get)', async () => {
    const response = await request(app.getHttpServer())
      .get('/todos')
      .set('Authorization', `Bearer ${jwtToken}`)
      .query({
        userId: user2Id,
      })
      .expect(200)

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          title: 'ガス代を払う',
          content: 'コンビニで支払うこと。',
          userId: expect.any(String),
        },
        {
          id: expect.any(String),
          title: '水道代を払う',
          content: 'コンビニで支払うこと。',
          userId: expect.any(String),
        },
      ]),
    )
    expect(response.body.length).toEqual(2)
  })
})
