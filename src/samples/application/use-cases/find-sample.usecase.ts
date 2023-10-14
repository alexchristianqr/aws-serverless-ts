import { SampleEntity } from "../../domain/entities/sample.entity.ts"
import { SampleProviderRepository } from "../../domain/repositories/sample-provider.repository.ts"

interface Model extends SampleEntity {}

export class FindSampleUsecase {
  constructor(private readonly repository: SampleProviderRepository<Model>) {}

  async execute(id: number): Promise<Model | null> {
    return this.repository.find(id)
  }
}
