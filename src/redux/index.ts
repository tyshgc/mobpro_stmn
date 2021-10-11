import { Store, createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { rootReducer } from "./reducers"
import { RootState } from "./states/root"
import { initialTodoState } from "./states/todo"
import { logger } from "./middlewares"

function configureStore(): Store<RootState> {
  let middleware = applyMiddleware(logger)

  if (process.env.NODE_ENV !== "production") {
    middleware = composeWithDevTools(middleware)
  }

  const store = createStore(
    rootReducer,
    {
      todo: initialTodoState,
    },
    middleware
  ) as Store<RootState>

  return store
}

const store = configureStore()
export default store
export type StoreType = typeof store
