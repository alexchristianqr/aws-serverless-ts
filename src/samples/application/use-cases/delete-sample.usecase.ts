import { SampleEntity } from "../../domain/entities/sample.entity.ts"
import { SampleProviderRepository } from "../../domain/repositories/sample-provider.repository.ts"

interface Model extends SampleEntity {}

export class DeleteSampleUsecase {
  constructor(private readonly repository: SampleProviderRepository<Model>) {}

  async execute(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
