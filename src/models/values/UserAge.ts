import ValueObject from "../shared/ValueObject"
import { ResultConstructorProps } from "../shared/Result"
import * as zod from "zod"

export default class UserAge extends ValueObject<UserAgeProps> {
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
          title: issue.message,
        }
      })

      const params: ResultConstructorProps<UserAge, null> = {
        status: "FAILURE",
        contents,
      }

      return this.getResult<UserAge, null>(params)
    }
  }

  public static factory(props: UserAgeProps) {
    return new UserAge(props)
  }
}

export type UserAgeProps = {
  value: number
}

const valueSchema = zod
  .number()
  .min(1, { message: "１歳以上で入力してください。" })
  .max(3, { message: "正しい年齢を入力してください。" })
