import ValueObject from "../shared/ValueObject"
import { ResultConstructorProps } from "../shared/Result"
import * as zod from "zod"

export default class TaskCompleted extends ValueObject<TaskCompletedProps> {
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
          title: "",
          detail: issue.message,
        }
      })

      const params: ResultConstructorProps<TaskCompleted, null> = {
        status: "FAILURE",
        contents,
      }

      return this.getResult<TaskCompleted, null>(params)
    }
  }

  public static factory(props: TaskCompletedProps) {
    return new TaskCompleted(props)
  }
}

const valueSchema = zod.boolean()

export type TaskCompletedProps = {
  value: boolean
}
