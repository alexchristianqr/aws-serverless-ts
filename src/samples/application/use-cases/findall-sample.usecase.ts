import { SampleEntity } from "../../domain/entities/sample.entity.ts"
import { SampleProviderRepository } from "../../domain/repositories/sample-provider.repository.ts"

interface Model extends SampleEntity {}

export class FindallSampleUsecase {
  constructor(private readonly repository: SampleProviderRepository<Model>) {}

  async execute(): Promise<Array<Model>> {
    return this.repository.findAll()
  }
}
