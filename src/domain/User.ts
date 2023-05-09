export default class User {
  id: number

  email: string

  isInitialUser: boolean

  constructor(id: number, email: string, isInitialUser: boolean) {
    this.id = id
    this.email = email
    this.isInitialUser = isInitialUser
  }

  public editable() {
    return !this.isInitialUser
  }
}
