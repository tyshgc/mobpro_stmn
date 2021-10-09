import ValueObject from "../shared/ValueObject"
import Result, { ResultConstructorProps } from "../../utils/Result"
import * as zod from "zod"

export default class TaskName extends ValueObject<TaskNameProps> {
  public value() {
    return this.props.value
  }

  public validation(): Result<unknown, null> | undefined {
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

      return this.getResult(params)
    }
  }

  public static factory(value: TaskNameProps["value"]) {
    return new TaskName({
      value,
    })
  }
}

const valueSchema = zod
  .string()
  .max(10, { message: "文字数は10文字以内にしてほしいな" })

export type TaskNameProps = {
  value: string
}
