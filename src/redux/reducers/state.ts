import { TodoModel } from '../models/TodoModel';

export interface RootState {
  todos: RootState.TodoState;
  router?: any;
}

export namespace RootState {
  export type TodoState = TodoModel[];
}
