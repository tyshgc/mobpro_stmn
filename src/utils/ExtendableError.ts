/**
 * Extendable Error Abstract Class
 * 拡張可能なエラー抽象クラス。これで任意でエラーを拡張していきます。
 */
export default abstract class ExtendableError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = this.constructor.name
    this.message = msg

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(msg).stack
    }
  }
}
