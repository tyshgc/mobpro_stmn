export default abstract class Repository<T> {
  protected entities: T

  constructor(entities: T) {
    this.entities = entities
  }
}
