import { SampleProviderRepository } from "./sample-provider.repository.ts"
import dataJSON from "../../../../data.json"
import { SampleEntity } from "../entities/sample.entity.ts"

interface Model extends SampleEntity {}

export class SampleLocalRepository extends SampleProviderRepository<Model> {
  private items: Array<Model> = dataJSON.data

  async create(data: Model): Promise<void> {
    this.items.push(data)
  }

  async delete(id: number): Promise<void> {
    this.items.filter((item) => item.id !== id)
  }

  async find(id: number): Promise<Model | null> {
    const todo: Model | undefined = this.items.find((item) => item.id == id)
    if (!todo) return null
    return todo
  }

  async findAll(): Promise<Array<Model>> {
    return this.items
  }

  async update(id: number, data: Model): Promise<void | null> {
    const sample: Model | undefined = this.items.find((item) => item.id == id)
    if (!sample) return null
    sample.id = data.id
    sample.name = data.name
  }

  async updateField(id: number, key: string, value: any): Promise<void | null> {
    const sample: any = this.items.find((item) => item.id == id)
    if (!sample) return null
    sample[key] = value
  }
}
