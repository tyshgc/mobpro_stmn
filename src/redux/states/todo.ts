import Task, { ValidationsType } from "../../models/entities/Task"
import EntityValidationError from "../../models/shared/EntityValidationError"

// Todoの状態、初期値
export const initialTodoState: TodoState = {
  tasks: [],
  exception: undefined,
}

/**
 * Todo State
 *
 * @param tasks (Task[]) タスク一覧を状態として持つ
 * @param exception (EntityValidationError<ValidationsType>) とりあえずTask エンティティの例外情報を状態として持つ
 *
 * ※ exceptionはエラーの要素とメッセージだけを持たせるでも良いです。やりやすい方法で。
 */
export type TodoState = {
  tasks: Task[]
  exception?: EntityValidationError<ValidationsType>
}
