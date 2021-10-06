import ValueObject from "../shared/ValueObject"
import { ResultConstructorProps } from "../shared/Result"
import * as zod from "zod"

export default class TaskName extends ValueObject<TaskNameProps> {
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

      const params: ResultConstructorProps<TaskName, null> = {
        status: "FAILURE",
        contents,
      }

      return this.getResult<TaskName, null>(params)
    }
  }

  public static factory(props: TaskNameProps) {
    return new TaskName(props)
  }
}

const valueSchema = zod
  .string()
  .max(10, { message: "文字数は10文字以内にしてほしいな" })

export type TaskNameProps = {
  value: string
}
