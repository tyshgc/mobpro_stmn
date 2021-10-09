import ExtendableError from "../../utils/ExtendableError"

export default class EntityValidationError<T> extends ExtendableError {
  public readonly results: T
  constructor(msg: string, results: T) {
    super(msg)
    this.message = msg
    this.results = results
  }
}
