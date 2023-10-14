import { SampleModel } from "../../domain/entities/sample.model.ts"
import { SampleEntity } from "../../domain/entities/sample.entity.ts"
import { SampleProviderRepository } from "../../domain/repositories/sample-provider.repository.ts"

interface Model extends SampleEntity {}
export interface ICreateSampleUsecase extends Partial<Model> {}

export class CreateSampleUsecase {
  constructor(private readonly repository: SampleProviderRepository<Model>) {}

  async execute(input: ICreateSampleUsecase): Promise<void> {
    const { id, name } = input

    const sample = new SampleModel()
    sample.id = id
    sample.name = name

    await this.repository.create(sample)
  }
}
