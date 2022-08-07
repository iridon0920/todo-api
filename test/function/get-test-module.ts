import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModel } from '../../src/model/user.model'
import { TodoModel } from '../../src/model/todo.model'
import { ControllerModule } from '../../src/controller/controller.module'

/**
 * E2Eテスト用モジュール生成
 */
export const getTestModule = async () => {
  return await Test.createTestingModule({
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
}
