import ValueObject from "../shared/ValueObject"
import { ResultConstructorProps } from "../../utils/Result"
import * as zod from "zod"

export default class CategoryName extends ValueObject<CategoryNameProps> {
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

      const params: ResultConstructorProps<CategoryName, null> = {
        status: "FAILURE",
        contents,
      }

      return this.getResult<CategoryName, null>(params)
    }
  }

  public static factory(props: CategoryNameProps) {
    return new CategoryName(props)
  }
}

const valueSchema = zod
  .string()
  .max(20, { message: "文字数は20文字以内にしてほしいな" })

export type CategoryNameProps = {
  value: string
}
