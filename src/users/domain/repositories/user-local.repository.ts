import { UserProviderRepository } from "./user-provider.repository.ts"
import dataJSON from "../../../../data.json"
import { UserEntity } from "../entities/user.entity.ts"

interface Model extends UserEntity {}

export class UserLocalRepository extends UserProviderRepository<Model> {
  private items: Array<Model> = dataJSON.data

  async create(data: Model): Promise<void> {
    this.items.push(data)
  }

  login(data: Model): Promise<any> {
    console.log(data)
    return Promise.resolve(undefined)
  }

  logout(data: Model): Promise<any> {
    console.log(data)
    return Promise.resolve(undefined)
  }
}
