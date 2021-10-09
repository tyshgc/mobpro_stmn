import { handleActions } from "redux-actions"
import { TodoState, initialTodoState } from "../states"
import { TodoActions } from "../actions"
import Task from "../../models/entities/Task"

export const todoReducer = handleActions<TodoState, Payload>(
  {
    // タスクを追加するAction
    [TodoActions.Type.ADD_TASK]: (state, action) => {
      if (!action.payload) return state

      const task = action.payload.task
      return {
        tasks: [...state.tasks, task],
      }
    },
  },
  initialTodoState
)

type Payload = {
  task: Task
  exception?: TodoState["exception"]
}
