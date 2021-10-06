import ValueObject from "../shared/ValueObject"
import { ResultConstructorProps } from "../shared/Result"
import * as zod from "zod"

export default class UserName extends ValueObject<UserNameProps> {
  public value() {
    return this.props.value.lastName + this.props.value.firstName
  }

  public firstName() {
    return this.props.value.firstName
  }

  public lastName() {
    return this.props.value.lastName
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

      const params: ResultConstructorProps<UserName, null> = {
        status: "FAILURE",
        contents,
      }

      return this.getResult<UserName, null>(params)
    }
  }

  public static factory(props: UserNameProps) {
    return new UserName(props)
  }
}

export type UserNameProps = {
  value: {
    firstName: string
    lastName: string
  }
}

const nameSchema = zod
  .string()
  .min(3, { message: "3文字以上で入力してください。" })
  .max(20, { message: "20文字以内で入力してください。" })

const valueSchema = zod.object({
  firstName: nameSchema,
  lastName: nameSchema,
})
