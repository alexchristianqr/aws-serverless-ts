export abstract class GenericProviderRepository<T> {
  abstract find(id: number): Promise<T | null>
  abstract findAll(): Promise<Array<T>>
  abstract create(data: T): Promise<void>
  abstract update(id: number, data: T): Promise<void | null>
  abstract delete(id: number): Promise<void>
}
