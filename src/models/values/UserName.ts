import ValueObject from '../shared/ValueObject'
import { ResultConstructorProps } from '../shared/Result'
import * as zod from 'zod'

export default class UserName extends ValueObject<UserNameProps> {
  public value() {
    return this.props.value.lastName + this.props.value.firstName
  }

  public firstName() {
    return this.props.value.firstName
  }

  public lastName() {
    return this.props.value.lastName
  }
  
  public static factory(props: UserNameProps) {
    return new UserName(props)
  }
}

export type UserNameProps = {
  value: {
    firstName: string
    lastName: string
  }
}