import ValueObject from "../shared/ValueObject"
import { ResultConstructorProps } from "../shared/Result"
import * as zod from "zod"

export default class TaskDetail extends ValueObject<TaskDetailProps> {
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
          title: "文字数が多いよ",
          detail: issue.message,
        }
      })

      const params: ResultConstructorProps<TaskDetail, null> = {
        status: "FAILURE",
        contents,
      }

      return this.getResult<TaskDetail, null>(params)
    }
  }

  public static factory(value: TaskDetailProps["value"]) {
    return new TaskDetail({
      value,
    })
  }
}

const valueSchema = zod
  .string()
  .max(200, { message: "文字数は200文字以内にしてほしいな" })
  .optional()

export type TaskDetailProps = {
  value: string
}
