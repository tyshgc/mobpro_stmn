import Entity from "../shared/Entity"
import TaskName, { TaskNameProps } from "../values/TaskName"
import TaskDetail, { TaskDetailProps } from "../values/TaskDetail"
import Result from "../shared/Result"
import EntityValidationError from "../shared/EntityValidationError"

/**
 * Task Entity
 *
 * @param props.name       (TaskName)       タスク名
 * @param props.detail     (TaskDetail)     タスク詳細
 * @param props.priority   (TaskPriority)   優先順位
 * @param props.status     (TaskStatus)     終了かどうかの状態
 * @param props.categories (TaskCategories) カテゴリ
 */
export default class Task extends Entity<TaskProps> {
  public getName() {
    return this.props.name
  }

  public getDetail() {
    return this.props.detail
  }

  public changeName(newName: string) {
    const name = TaskName.factory(newName)
    this.props = { ...this.props, name }
  }

  public changeDetail(newDetail: string) {
    const detail = TaskDetail.factory(newDetail)
    this.props = { ...this.props, detail }
  }

  public async validations() {
    const name = this.props.name.validation()
    const detail = this.props.detail?.validation()

    if (name?.status === "FAILURE" || detail?.status === "FAILURE") {
      throw new EntityValidationError<ValidationsType>(
        "タスクの作成に失敗しました",
        { name, detail }
      )
    }
  }

  public static factory(props: FactoryProps) {
    const name = TaskName.factory(props.name)
    const detail = TaskDetail.factory(props.detail!)

    return new Task({ name, detail })
  }
}

type TaskProps = {
  id?: number //todo: ID ValueObjectを作る
  name: TaskName
  detail?: TaskDetail
  priority?: any //todo: Priority ValueObjectを作る
  isCompleted?: boolean //todo: Status ValueObjectを作る
  categories?: any[] //todo: Category Entityを作る
}

export type FactoryProps = {
  name: TaskNameProps["value"]
  detail?: TaskDetailProps["value"]
}
export type ValidationsType =
  | { name?: Result<unknown, null>; detail?: Result<unknown, null> }
  | undefined
