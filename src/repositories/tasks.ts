import Repository from "./shared/Repository"
import { fetchTasks, postTask, TaskResponce } from "../gateways"
import Task from "../models/entities/Task"

export default class TasksRepository extends Repository<TaskEntities> {
  // 初期のタスクを保持・取得
  public static async initialize() {
    const tasksFetchData = (await fetchTasks()) as TaskResponce[]
    const taskEntities = createTasks(tasksFetchData)

    new TasksRepository(taskEntities)

    return taskEntities
  }

  // タスクを追加
  public static async addTask(newTask: Task) {
    const data = {
      title: "",
      detail: "",
      priority: 2,
    }
    const resultTasks = (await postTask(data)) as TaskResponce[]
    const taskEntities = createTasks(resultTasks)

    new TasksRepository(taskEntities)

    return taskEntities
  }
}

function createTasks(tasks: TaskResponce[]) {
  return tasks.map((task) => {
    return Task.factory({
      name: {
        value: task.title || "タイトルがありません",
      },
    })
  })
}

type TaskEntities = Task[]
