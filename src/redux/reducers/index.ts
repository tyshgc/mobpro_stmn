import { combineReducers } from "redux"
import { RootState } from "./state"
import { todoReducer } from "./todos"

export type { RootState }

export const rootReducer = combineReducers<RootState>({
  todos: todoReducer,
})
