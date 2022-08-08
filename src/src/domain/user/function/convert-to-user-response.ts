import { User } from '../user'
import { UserResponse } from '../../../dto/response/user/user-response'

/**
 * ユーザエンティティをレスポンス用データに変換する
 */
export const convertToUserResponse = (user: User): UserResponse => {
  return {
    id: user.getId(),
    email: user.getEmail().toString(),
    name: user.getName().toString(),
  }
}
