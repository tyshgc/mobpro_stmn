import Entity from "../shared/Entity"
import TaskName, { TaskNameProps } from "../values/TaskName"

/**
 * - タスク名
 * - タスク詳細
 * - 優先順位
 * - 終了フラグ
 * - カテゴリ
 */
export default class Task extends Entity<TaskProps> {
  public getName() {
    return this.props.name
  }

  public changeName(newName: string) {
    const name = TaskName.factory({
      value: newName,
    })

    this.props = { ...this.props, name }
  }

  public static factory(props: FactoryProps) {
    const name = TaskName.factory({
      value: props.name.value,
    })

    return new Task({ name })
  }
}

type TaskProps = {
  id?: number
  name: TaskName
  detail?: string
  priority?: any
  isCompleted?: boolean
  categories?: any[]
}

type FactoryProps = {
  name: TaskNameProps
}
