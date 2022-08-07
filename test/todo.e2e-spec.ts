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
})
