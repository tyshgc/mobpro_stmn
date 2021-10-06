const mockUser: ResponseUserType = {
  id: 1,
  firstName: "永井",
  lastName: "洸気",
  age: 26,
}

export const fetchUser = (): Promise<ResponseUserType> => {
  return new Promise((resolve) => {
    return resolve(mockUser)
  })
}

export type ResponseUserType = {
  id: number
  firstName: string
  lastName: string
  age?: number
}
