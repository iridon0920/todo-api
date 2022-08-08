import { User } from '../user'
import { UserModel } from '../../../model/user.model'

export const convertToUserModel = (user: User) => {
  const userModel = new UserModel()

  userModel.id = user.getId()
  userModel.email = user.getEmail().toString()
  userModel.name = user.getName().toString()

  return userModel
}
