import { INestApplication } from '@nestjs/common'
import { TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { getTestUserToken } from './function/get-test-user-token'
import { getTestModule } from './function/get-test-module'
import { getInitApp } from './function/get-init-app'

describe('TodosController (e2e)', () => {
  let app: INestApplication
  let moduleFixture: TestingModule
  let jwtToken: string
  // 2つ目のユーザのトークン
  let jwtToken2: string

  beforeAll(async () => {
    moduleFixture = await getTestModule()
    app = await getInitApp(moduleFixture)
    jwtToken = await getTestUserToken(app)
  })

  it('Todo作成 - /todos (POST)', () => {
    return request(app.getHttpServer())
      .post('/todos')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: 'ミルクを買う',
        content: '近所のスーパーで買うこと。',
      })
      .expect(201)
      .expect({
        id: 1,
        title: 'ミルクを買う',
        content: '近所のスーパーで買うこと。',
        userId: 1,
      })
  })

  it('Todoの更新 - /todos/:id (PATCH)', () => {
    // POSTのテストで作成したTodoを更新
    return request(app.getHttpServer())
      .patch('/todos/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: '卵を買う',
      })
      .expect(200)
      .expect({
        id: 1,
        title: '卵を買う',
        content: '近所のスーパーで買うこと。',
        userId: 1,
      })
  })

  it('Todoの更新失敗（他のユーザのTodoは更新できない） - /todos/:id (PATCH)', async () => {
    // 新規ユーザ作成
    await request(app.getHttpServer()).post('/user').send({
      email: 'test2@example.com',
      name: 'テスト2',
      password: 'password',
    })
    // 新規ユーザのログイントークン取得
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test2@example.com',
        password: 'password',
      })
    jwtToken2 = loginResponse.body.access_token

    // 新規ユーザで作成済Todoの更新リクエスト
    return request(app.getHttpServer())
      .patch('/todos/1')
      .set('Authorization', `Bearer ${jwtToken2}`)
      .send({
        title: '豚肉を買う',
      })
      .expect(401)
  })

  it('Todoの参照 - /todos/:id (Get)', () => {
    // PATCHのテストで更新したTodoを取得
    return request(app.getHttpServer())
      .get('/todos/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .expect({
        id: 1,
        title: '卵を買う',
        content: '近所のスーパーで買うこと。',
        userId: 1,
      })
  })

  it('Todoの参照（別ユーザでも参照可能） - /todos/:id (Get)', () => {
    return request(app.getHttpServer())
      .get('/todos/1')
      .set('Authorization', `Bearer ${jwtToken2}`)
      .expect(200)
      .expect({
        id: 1,
        title: '卵を買う',
        content: '近所のスーパーで買うこと。',
        userId: 1,
      })
  })

  it('Todoの参照失敗（認証なしでは取得不可） - /todos/:id (Get)', () => {
    return request(app.getHttpServer()).get('/todos/1').expect(401)
  })
})
