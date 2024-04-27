import { GenericProviderRepository } from "../../../../@common";

export abstract class UserOutputRepository<T> extends GenericProviderRepository<T> {
  abstract updateField(id: number, key: string, value: any): Promise<boolean>;
}
