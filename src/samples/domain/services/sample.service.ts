import { Sample } from "../entities/sample.ts"
import { SampleGenericProviderRepository } from "../repositories/sample-generic-provider.repository.ts"

export class SampleService {
  constructor(private repository: SampleGenericProviderRepository<Sample>) {}

  create(data: Sample): Promise<void> {
    return this.repository.create(data)
  }

  delete(id: number): Promise<void> {
    return this.repository.delete(id)
  }

  find(id: number): Promise<Sample | null> {
    return this.repository.find(id)
  }

  findAll(): Promise<Array<Sample>> {
    return this.repository.findAll()
  }

  update(id: number, data: Sample): Promise<void | null> {
    return this.repository.update(id, data)
  }
}
