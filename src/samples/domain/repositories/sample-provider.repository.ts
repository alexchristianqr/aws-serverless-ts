import { GenericProviderRepository } from "../../../shared/domain/repositories/generic-provider.repository.ts"

export abstract class SampleProviderRepository<T> extends GenericProviderRepository<T> {
  abstract find(id: number): Promise<T | null>
  abstract findAll(): Promise<Array<T>>
  abstract update(id: number, data: T): Promise<void | null>
  abstract delete(id: number): Promise<void>
  abstract updateField(id: number, key: string, value: any): Promise<void | null>
}
