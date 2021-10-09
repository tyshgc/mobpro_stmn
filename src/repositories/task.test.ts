import TasksRepository from "./task"

describe("Tasks Repository Test", () => {
  test("Tasks Repositoryを初期化", () => {
    TasksRepository.initialize().then((repository) => {
      expect(repository).toBeInstanceOf(TasksRepository)
    })
  })
  test("タスク一覧を取得", () => {
    TasksRepository.initialize().then(async (repository) => {
      const tasks = await repository.getTasks()
      expect(tasks.length).toHaveLength(1)
    })
  })
  test("タスクを追加", () => {
    const mock = {
      name: "テストをおこなう",
      detail: "ユニットテストのコードを書く",
    }
    TasksRepository.initialize().then(async (repository) => {
      const task = await repository.addTask(mock)
      const taskName = task.getName().value()
      const taskDetail = task.getDetail()?.value()

      expect(taskName).toBe(mock.name)
      expect(taskDetail).toBe(mock.detail)
    })
  })
  test("タスクの追加時でバリデーションが正常に機能するか", () => {
    const mock = {
      name: "タスク名が10文字以上でエラーを返すか",
      detail: undefined,
    }
    TasksRepository.initialize().then((repository) => {
      expect(() => repository.addTask(mock)).rejects.toThrow(
        "タスクの作成に失敗しました"
      )
    })
  })
})

export {}
