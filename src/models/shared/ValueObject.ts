import { shallowEqual } from "shallow-equal-object"
import Result, { ResultConstructorProps } from "./Result"

/**
 * Value Object abstract Class
 * 値オブジェクトの抽象（基底）クラス
 *
 * rule
 * - Immutable（不変）なオブジェクトなので生成されて破棄されるまで値の変化はしない・させない
 * - Entityで主に活用
 * - バリデーションはEntityを通して行う（集約→Entity→ValueObject）
 */
export default abstract class ValueObject<T> {
  protected readonly props: T

  constructor(props: T) {
    this.props = Object.freeze(props)
  }

  public equals(valuObject?: ValueObject<T>): boolean {
    if (valuObject === null || valuObject === undefined) {
      return false
    }
    if (valuObject.props === undefined) {
      return false
    }
    return shallowEqual(this.props, valuObject.props)
  }

  protected getResult<I, E>(props: Props<I, E>) {
    return Result.create(props)
  }
}

type Props<I, E> = Pick<
  ResultConstructorProps<I, E>,
  "status" | "contents" | "failer"
>
