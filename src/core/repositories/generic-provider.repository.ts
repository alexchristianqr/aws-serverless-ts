export abstract class GenericProviderRepository<T> {
  abstract create?(data: T): Promise<T | undefined>
  abstract getAll?(): Promise<Array<T>>
  abstract getById?(id: number): Promise<T | null>
  abstract update?(id: number, data: T): Promise<boolean>
  abstract delete?(id: number): Promise<boolean>
}
