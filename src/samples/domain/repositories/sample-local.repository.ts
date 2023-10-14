import { Sample } from "../entities/sample.ts"
import { SampleGenericProviderRepository } from "./sample-generic-provider.repository.ts"
import dataJSON from "../../../../data.json"

export class SampleLocalRepository extends SampleGenericProviderRepository<Sample> {
  private items: Array<Sample> = dataJSON.data

  async create(data: Sample): Promise<void> {
    this.items.push(data)
  }

  async delete(id: number): Promise<void> {
    this.items.filter((item) => item.id !== id)
  }

  async find(id: number): Promise<Sample | null> {
    const todo: Sample | undefined = this.items.find((item) => item.id == id)
    if (!todo) return null
    return todo
  }

  async findAll(): Promise<Array<Sample>> {
    return this.items
  }

  async update(id: number, data: Sample): Promise<void | null> {
    const todo: Sample | undefined = this.items.find((item) => item.id === id)
    if (!todo) return null
    todo.id = data.id
    todo.name = data.name
  }
}
