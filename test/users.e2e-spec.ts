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
})
