import { UserEntity } from "./user.entity.ts"

export class UserModel extends UserEntity {
  constructor(user?: UserModel) {
    super()
    this.id = user?.id
    this.name = user?.name
    this.username = user?.username
    this.password = user?.password
  }
}
