import { userAddTask } from "./userAddTask"
import store from "../../redux"

describe("addTask Test", () => {
  test("タスクの追加ができるか", (done) => {
    userAddTask(store, {
      name: "市役所へ行く",
      detail: "市役所で住民票をゲットする",
    }).then(() => done())
  })
})

export {}
