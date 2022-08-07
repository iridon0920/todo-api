import { Todo } from '../todo'
import { TodoModel } from '../../../model/todo.model'
import { convertToUserModel } from '../../user/function/convert-to-user-model'

export const convertToTodoModel = (todo: Todo) => {
  const todoModel = new TodoModel()

  todoModel.id = todo.getId()
  todoModel.title = todo.getTitle()
  todoModel.content = todo.getContent()
  todoModel.user = convertToUserModel(todo.getUser())

  return todoModel
}
