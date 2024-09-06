import { GenericProviderRepository } from "../../../../@common";

export abstract class SampleOutputRepository<T> extends GenericProviderRepository<T> {
  abstract updateField(id: number, request: any): Promise<boolean>;
}
