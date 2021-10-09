import ValueObject from "../shared/ValueObject"
import { ResultConstructorProps } from "../../utils/Result"
import * as zod from "zod"

/**
 * 優先順位がタスクの並び順を表す(1~n)
 */

export default class TaskPriority extends ValueObject<TaskPriorityProps> {
  public value() {
    return this.props.value
  }

  public validation() {
    const { value } = this.props
    const result = valueSchema.safeParse(value)

    if (!result.success) {
      const contents = result.error.issues.map((issue) => {
        return {
          path: issue.path[0],
          code: issue.code,
          title: "数字に欲しいな",
          detail: issue.message,
        }
      })

      const params: ResultConstructorProps<TaskPriority, null> = {
        status: "FAILURE",
        contents,
      }

      return this.getResult<TaskPriority, null>(params)
    }
  }

  public static factory(props: TaskPriorityProps) {
    return new TaskPriority(props)
  }
}

const valueSchema = zod.number().min(1, { message: "数字に欲しいな" })

export type TaskPriorityProps = {
  value: number
}
