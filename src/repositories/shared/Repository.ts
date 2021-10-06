export default abstract class Repository<T> {
  protected readonly entities: T;

  constructor(entities: T) {
    this.entities = entities;
  }

  // 現在のタスクを取得
  public getTasks() {
    return this.entities;
  }
}
