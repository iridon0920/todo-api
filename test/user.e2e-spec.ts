import * as request from 'supertest'
import { TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { getTestModule } from './function/get-test-module'
import { getInitApp } from './function/get-init-app'

describe('UserController (e2e)', () => {
  let app: INestApplication
  let moduleFixture: TestingModule
  let jwtToken: string

  beforeAll(async () => {
    moduleFixture = await getTestModule()
    app = await getInitApp(moduleFixture)
  })

  it('新規ユーザ作成 - /user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        email: 'test@example.com',
        name: 'テスト',
        password: 'password',
      })
      .expect(201)
      .expect({ id: 1, email: 'test@example.com', name: 'テスト' })
  })

  it('ユーザ作成失敗（メール重複） - /user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        email: 'test@example.com',
        name: 'テスト',
        password: 'password',
      })
      .expect(400)
      .expect({ statusCode: 400, message: 'メールアドレスが重複しています。' })
  })

  it('ユーザ作成失敗（入力内容不備） - /user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        email: 'hoge@example.com',
        name: 'hoge',
        password: 'pass',
      })
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'パスワードの長さは8文字以上にしてください。',
      })
  })

  it('認証ユーザ情報を更新 - /user (PATCH)', async () => {
    // テストで作成したユーザでログインしてJWT取得
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password',
      })
    jwtToken = loginResponse.body.access_token

    return request(app.getHttpServer())
      .patch('/user')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        name: 'test',
      })
      .expect(200)
      .expect({ id: 1, email: 'test@example.com', name: 'test' })
  })

  it('認証ユーザを削除 - /user (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete('/user')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send()
      .expect(200)
      .expect({})

    // 削除済ユーザでログインしても失敗する
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password',
      })
      .expect(401)
  })
})
