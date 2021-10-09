import { combineReducers } from "redux"
import { RootState } from "../states/root"
import { todoReducer } from "./todo"

export const rootReducer = combineReducers<RootState>({
  todo: todoReducer,
})
