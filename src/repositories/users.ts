import Repository from "./shared/Repository"
import User from "../models/entities/User"
import { fetchUser, ResponseUserType } from "../gateways"

export default class UserRepository extends Repository<User> {
  public static async initialize() {
    const userFetchData = await fetchUser()
    const userEntity = createUser(userFetchData)

    new UserRepository(userEntity)
    return userEntity
  }

  public getUser() {
    return this.entities
  }
}

function createUser(user: ResponseUserType) {
  return User.factory({
    id: user.id,
    name: {
      value: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    },
    age: user.age
      ? {
          value: user.age,
        }
      : undefined,
  })
}
