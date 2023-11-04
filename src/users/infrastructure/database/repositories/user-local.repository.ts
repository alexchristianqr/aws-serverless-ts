import { UserOutputRepository } from "../../../domain/ports/output/user-output.repository.ts"
import { Model } from "../../../domain/entities/user.entity.ts"
import dataJSON from "../../../../../data.json"

export class UserLocalRepository implements UserOutputRepository<Model> {
  private items: Array<Model> = dataJSON.data

  async create(data: Model): Promise<Model> {
    this.items.push(data)
    return data
  }

  async delete(id: number): Promise<boolean> {
    this.items.filter((item) => item.id !== id)
    return true
  }

  async getById(id?: number): Promise<Model | null> {
    const sample: Model | undefined = this.items.find((item) => item.id == id)
    if (!sample) return null
    return sample
  }

  async getAll(): Promise<Array<Model>> {
    return this.items
  }

  async update(id: number, data: Model): Promise<boolean> {
    const sample: Model | undefined = this.items.find((item) => item.id == id)
    if (!sample) return false
    sample.id = data.id
    sample.name = data.name
    return true
  }

  async updateField(id: number, key: string, value: any): Promise<boolean> {
    const sample: any = this.items.find((item) => item.id == id)
    if (!sample) return false
    sample[key] = value
    return true
  }
}
