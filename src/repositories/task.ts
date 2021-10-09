import Repository from "./shared/Repository"
import { fetchTasks, postTask } from "../gateways"
import Task, { FactoryProps } from "../models/entities/Task"

/**
 * Task Repository
 *
 * @param entitites <Task[]> タスクの集約
 */
export default class TasksRepository extends Repository<TaskEntities> {
  /**
   * initialize()
   * 初期のタスクを保持・取得
   */
  public static async initialize() {
    const taskEntities = await fetchToCreateTasks()
    return new TasksRepository(taskEntities)
  }

  /**
   * getTasks()
   * 現在のタスク一覧を取得
   */
  public async getTasks() {
    const taskEntities = await fetchToCreateTasks()
    this.entities = taskEntities
    return this.entities
  }

  /**
   * addTask()
   * タスクを追加
   * @param task.name (TaskNameProps["value"]) タスク名
   * @param task.detail (TaskDetailProps["value"]) タスク詳細文
   */
  public async addTask(task: FactoryProps) {
    // 新しいタスクインスタンスを生成
    const newTask = Task.factory(task)

    // Entityのバリデーション
    await newTask.validations()

    // バリデーションに問題がなければ生成したタスクをPOSTする
    const title = newTask.getName().value()
    const detail = newTask.getDetail()?.value()
    await postTask({
      title,
      detail,
    })

    // POSTに成功すればentities(=Task[])に新しいTaskを追加し、成功したTaskインスタンスを返す
    this.entities = [...this.entities, newTask]
    return newTask
  }
}

// GatewayからfetchしたデータをTaskインスタンスへ
async function fetchToCreateTasks() {
  const tasks = await fetchTasks()
  return tasks.map((task) => {
    return Task.factory({
      name: task.title || "タイトルがありません",
      detail: task.detail || "",
    })
  })
}

type TaskEntities = Task[]
