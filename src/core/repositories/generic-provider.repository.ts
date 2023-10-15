export abstract class GenericProviderRepository<T> {
  abstract create(data: T): Promise<boolean>
}
