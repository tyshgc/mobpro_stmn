import { v4 as uuidv4 } from 'uuid';

/**
 * Entity abstract class
 * エンティティの抽象（基底）クラス
 *
 * rule
 * - EntityはValueObject型のみを属性に持てる
 * - Entityは集約（Aggregate）でも内包されるが、Entity同士では内包しない
 * - Entityは一意的存在である（同一 = 一つのEntityインスタンスは常に同一である）
 * - Entityは対象物のライフサイクルにあわせて永続的であることがのぞましい
 */
export default abstract class Entity<T> {
  protected readonly uuid: string;
  protected props: T;

  constructor(props: T, uuid?: string) {
    this.uuid = uuid || uuidv4();
    this.props = props;
  }

  public equals(entity?: Entity<T>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }
    if (entity.props === undefined) {
      return false;
    }
    if (!isEntity(entity)) {
      return false;
    }
    return this.uuid === entity.uuid;
  }
}

const isEntity = <T>(v: Entity<T>): v is Entity<T> => {
  return v instanceof Entity;
};
