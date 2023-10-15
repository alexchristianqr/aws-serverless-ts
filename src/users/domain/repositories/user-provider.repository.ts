import { GenericProviderRepository } from "../../../shared/repositories/generic-provider.repository.ts"

export abstract class UserProviderRepository<T> extends GenericProviderRepository<T> {
  abstract login(data: T): Promise<any>
  abstract logout(data: T): Promise<any>
}