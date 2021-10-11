import { useCallback } from "react"
import { useSelector } from "react-redux"
import { userAddTask } from "../useCases/todo"
import { RootState } from "../redux/states"
import store from "../redux"

/**
 * Task List Hooks
 * タスクを一覧するHooks
 */
export function useTaskList() {
  const tasks = useSelector((state: RootState) => {
    return state.todo.tasks
  })

  const addTask = useCallback(() => {
    userAddTask(store, { name: "おげ", detail: "とげ" })
  }, [])

  return {
    tasks,
    addTask,
  }
}
