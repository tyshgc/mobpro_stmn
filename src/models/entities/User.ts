import Entity from '../shared/Entity'
import UserName, { UserNameProps } from '../values/UserName'

export default class User extends Entity<UserProps> {
  public getName() {
    return this.props.name
  }

  public changeFirstName(newName: string) {
    const name = UserName.factory({
      value: {
        firstName: newName,
        lastName: this.props.name.lastName()
      }
    })

    this.props = { ...this.props, name }
  }

  public changeLastName(newName: string) {
    const name = UserName.factory({
      value: {
        firstName: this.props.name.firstName(),
        lastName: newName
      }
    })

    this.props = { ...this.props, name }
  }

  public static factory(props: FactoryProps) {
    const name = UserName.factory({
      value: props.name.value
    })
    return new User({ name })
  }
};


type UserProps = {
  id?: number
  name: UserName
  age?: number
}

type FactoryProps = {
  id: number
  name: UserNameProps
}