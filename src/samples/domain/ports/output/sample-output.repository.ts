import { GenericProviderRepository } from "../../../../@common";

export abstract class SampleOutputRepository<T> extends GenericProviderRepository<T> {
  abstract updateField(id: number, key: string, value: any): Promise<boolean>;
}
