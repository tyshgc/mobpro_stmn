import { ZodIssueCode } from "zod"

/**
 * Result Helper Class
 * 結果のステータスとコード・メッセージと生成されたインスタンス
 *
 * usage)
 * type Name = { firstName: string, lastName: string }
 * const nameInstance: Name = { firstName: "hoge", lastName: "moge" }
 * const userName = Result.create<Name, ExceptionError>({ status: "FAILED", instance: nameInstance, resultType: "NOTFOUND_USER", message: [
 *  { title: "ユーザいないよ", detail: "だからユーザいないってばよ" },
 * ]})
 */
export default class Result<T, F> {
  private readonly $status: ResultStatusType
  private readonly $data?: T
  private readonly $contents?: ResultContent[]
  private readonly $failer?: F

  constructor(props: ResultConstructorProps<T, F>) {
    this.$status = props.status
    this.$contents = props.contents
    this.$data = props.data
    this.$failer = props.failer

    Object.freeze(this)
  }

  // データのみを返す
  public get data() {
    return this.$data
  }

  // 結果のステータスのみを返す
  public get status() {
    return this.$status
  }

  // 結果の内容のみを返す
  public get contents() {
    const contents = this.$contents
    return contents
  }

  // 全て返す
  public get all() {
    const data = this.$data
    const contents = this.$contents
    return { data, contents }
  }

  public get failer() {
    return this.$status === "FAILURE" ? this.$failer : undefined
  }

  public static create<T, F>(
    params: ResultConstructorProps<T, F>
  ): Result<T, F> {
    return new Result(params)
  }
}

export type ResultConstructorProps<T, F> = {
  status: ResultStatusType
  data?: T
  contents?: ResultContent[]
  failer?: F
}

export type ResultStatusType = "SUCCESS" | "FAILURE"
export type ResultCodeType = "notfound_user" | "exception" | ZodIssueCode
export type ResultContent = {
  title: string
  detail?: string
  code?: ResultCodeType
}
export type ResultSet = {
  status: ResultStatusType
  contents?: ResultContent[]
}
