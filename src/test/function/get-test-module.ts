import { Test } from '@nestjs/testing'
import { ControllerModule } from '../../src/controller/controller.module'

/**
 * E2Eテスト用モジュール生成
 */
export const getTestModule = async () => {
  return await Test.createTestingModule({
    imports: [ControllerModule],
  }).compile()
}
