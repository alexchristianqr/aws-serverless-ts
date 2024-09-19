export abstract class GenericProviderRepository {
  abstract create(payload: any): Promise<Record<string, any> | null>;
  abstract getAll(payload?: any, isPageable?: boolean): Promise<Array<any> | []>;
  abstract getById(id: number): Promise<Record<string, any> | null>;
  abstract update(id: number, payload: any): Promise<boolean>;
  abstract delete(id: number): Promise<boolean>;
}
