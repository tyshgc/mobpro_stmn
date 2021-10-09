export namespace TodoActions {
  export enum Type {
    ADD_TASK = "ADD_TASK",
    ADD_TASK_ERROR = "ADD_TASK_ERROR",
  }
}

export type TodoActions = Omit<typeof TodoActions, "Type">
