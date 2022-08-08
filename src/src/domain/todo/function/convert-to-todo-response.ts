import { Todo } from '../todo'
import { TodoResponse } from '../../../dto/response/todo/todo-response'

export const convertToTodoResponse = (todo: Todo): TodoResponse => {
  return {
    id: todo.getId(),
    title: todo.getTitle(),
    content: todo.getContent(),
    userId: todo.getUserId(),
  }
}
