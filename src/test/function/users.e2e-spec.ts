import { INestApplication } from '@nestjs/common'
import { TestingModule } from '@nestjs/testing'
import { getTestModule } from './get-test-module'
import { getInitApp } from './get-init-app'
import { createDynamoLocalTable } from '../../src/repository/function/create-dynamo-local-table'
import * as request from 'supertest'

describe('UsersController (e2e)', () => {
  let app: INestApplication
  let moduleFixture: TestingModule
  let userId: string
  let jwtToken: string

  beforeAll(async () => {
    moduleFixture = await getTestModule()
    app = await getInitApp(moduleFixture)
    await createDynamoLocalTable()
  })

  it('ユーザ情報取得 - /users/:id (GET)', async () => {
    const response = await request(app.getHttpServer()).post('/user').send({
      email: 'test@example.com',
      name: 'テスト',
      password: 'password',
    })

    userId = response.body.id

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        userId,
        password: 'password',
      })
    jwtToken = loginResponse.body.access_token

    const userResponse = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        userId,
        password: 'password',
      })

    expect(userResponse.body).toEqual({
      id: expect.any(String),
      email: 'test@example.com',
      name: 'テスト',
    })
  })

  it('全ユーザ情報取得 - /users', async () => {
    await request(app.getHttpServer()).post('/user').send({
      email: 'test2@example.com',
      name: 'テスト2',
      password: 'password',
    })
    await request(app.getHttpServer()).post('/user').send({
      email: 'test3@example.com',
      name: 'テスト3',
      password: 'password',
    })

    const response = await request(app.getHttpServer())
      .get(`/users`)
      .set('Authorization', `Bearer ${jwtToken}`)

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(String),
          email: 'test2@example.com',
          name: 'テスト2',
        },
        {
          id: expect.any(String),
          email: 'test3@example.com',
          name: 'テスト3',
        },
      ]),
    )
    expect(response.body.length).toEqual(3)
  })
})
