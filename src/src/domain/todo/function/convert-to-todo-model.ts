import { Todo } from '../todo'
import { TodoModel } from '../../../model/todo.model'

export const convertToTodoModel = (todo: Todo) => {
  const todoModel = new TodoModel()

  todoModel.id = todo.getId()
  todoModel.title = todo.getTitle()
  todoModel.content = todo.getContent()
  todoModel.userId = todo.getUserId()

  return todoModel
}
