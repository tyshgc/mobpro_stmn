import { Store, createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { RootState, rootReducer } from "./reducers"
import { logger, thunk } from "./middlewares"

export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(thunk, logger)

  if (process.env.NODE_ENV !== "production") {
    middleware = composeWithDevTools(middleware)
  }

  const store = createStore(
    rootReducer as any,
    initialState as any,
    middleware
  ) as Store<RootState>

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextReducer = require("./reducers")
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
