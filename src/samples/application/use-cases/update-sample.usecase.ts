import { SampleEntity } from "../../domain/entities/sample.entity.ts"
import { SampleProviderRepository } from "../../domain/repositories/sample-provider.repository.ts"

interface Model extends SampleEntity {}
export interface IUpdateSampleUsecase extends Partial<Model> {}

export class UpdateSampleUsecase {
  constructor(private readonly repository: SampleProviderRepository<Model>) {}

  async execute(id: number, data: IUpdateSampleUsecase): Promise<boolean> {
    return this.repository.update(id, data)
  }
}
