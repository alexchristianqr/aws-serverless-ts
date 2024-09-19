import { GenericProviderRepository } from "../../../../@common";

export abstract class SampleOutputRepository extends GenericProviderRepository {
  abstract updateField(id: number, payload: any): Promise<boolean>;
}
