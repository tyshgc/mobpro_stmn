import Entity from '../shared/Entity'
import UserName, { UserNameProps } from '../values/UserName'
import UserAge, { UserAgeProps } from '../values/UserAge'

type UserProps = {
  id?: number
  name: UserName
  age?: UserAge
}

type FactoryProps = {
  id?: number
  name: UserNameProps
  age?: UserAgeProps
}
export default class User extends Entity<UserProps> {
  public getName() {
    return this.props.name
  }

  public getUserAge() {
    return this.props.age
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
    const name = props.name.value
    const age = props.age?.value
    
    return new User(
      { name: UserName.factory({ value: name }),
        age: age ? UserAge.factory({ value: age }) : undefined
      }
    )
  }
};