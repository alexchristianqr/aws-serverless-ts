import { GenericProviderRepository } from "../../../../core"

export abstract class SampleOutputRepository<T> extends GenericProviderRepository<T> {
  abstract getById(id: number): Promise<T | null>
  abstract getAll(): Promise<Array<T>>
  abstract update(id: number, data: T): Promise<boolean>
  abstract delete(id: number): Promise<boolean>
  abstract updateField(id: number, key: string, value: any): Promise<boolean>
}
