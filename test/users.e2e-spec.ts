import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { ControllerModule } from '../src/controller/controller.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from '../src/model/user.model'
import { TodoModel } from '../src/model/todo.model'

describe('UsersController (e2e)', () => {
  let app: INestApplication
  let moduleFixture: TestingModule

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [UserModel, TodoModel],
          synchronize: true,
        }),
        ControllerModule,
      ],
    }).compile()

    // Nestアプリケーション起動
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('ユーザ作成 - /users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'test@example.com',
        name: 'テスト',
        password: 'password',
      })
      .expect(201)
      .expect({ id: 1, email: 'test@example.com', name: 'テスト' })
  })

  it('ユーザ作成失敗（メール重複） - /users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'test@example.com',
        name: 'テスト',
        password: 'password',
      })
      .expect(400)
      .expect({ statusCode: 400, message: 'メールアドレスが重複しています。' })
  })

  it('ユーザ作成失敗（入力内容不備） - /users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
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

  it('ユーザ情報を更新 - /users (PATCH)', async () => {
    // テストで作成したユーザでログインしてJWT取得
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password',
      })
    const jwtToken = loginResponse.body.access_token

    return request(app.getHttpServer())
      .patch('/users')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        name: 'test',
      })
      .expect(200)
      .expect({ id: 1, email: 'test@example.com', name: 'test' })
  })
})
