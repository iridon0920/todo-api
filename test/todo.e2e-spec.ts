import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from '../src/model/user.model'
import { TodoModel } from '../src/model/todo.model'
import { ControllerModule } from '../src/controller/controller.module'
import * as request from 'supertest'
import { getTestUserToken } from './get-test-user-token'

describe('TodosController (e2e)', () => {
  let app: INestApplication
  let moduleFixture: TestingModule
  let jwtToken: string

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
      })
  })
})
