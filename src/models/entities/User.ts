import Entity from '../shared/Entity'

export default class User extends Entity<UserProps> {
  public static factory(props: FactoryProps) {
    return new User(props)
  }
};


type UserProps = {
  id?: number
  firstName: string
  lastName: string
  age?: number
}

type FactoryProps = {
  id: number
  firstName: string
  lastName: string
}