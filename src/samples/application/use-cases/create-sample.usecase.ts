import { GenericProviderRepository } from "../../../shared/domain/repositories/generic-provider.repository.ts"
import { Sample } from "../../domain/entities/sample.ts"

export interface ICreateSampleUsecase {
  id: number
  name: string
}

export class CreateSampleUsecase {
  constructor(private readonly repository: GenericProviderRepository<Sample>) {}

  async execute(input: ICreateSampleUsecase): Promise<Sample> {
    const { id, name } = input

    const sample = new Sample()
    sample.id = id
    sample.name = name

    await this.repository.create(sample)
    return sample
  }
}
