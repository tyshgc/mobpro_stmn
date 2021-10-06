export default abstract class Repository<T> {
  protected readonly entities: T

  constructor(entities: T) {
    this.entities = entities
  }
}
