import { SampleInputService } from "../../domain/ports/input/sample-input.service.ts"
import { SampleOutputRepository } from "../../domain/ports/output/sample-output.repository.ts"
import { SampleEntity } from "../../domain/entities/sample.entity.ts"
import { CreateSampleDto } from "../dtos/create-sample.dto.ts"
import { UpdateSampleDto } from "../dtos/update-sample.dto.ts"

interface Model extends SampleEntity {}

export class SampleUsecase implements SampleInputService {
  constructor(private readonly repository: SampleOutputRepository<Model>) {}

  create(data: CreateSampleDto): Promise<boolean> {
    const sample: CreateSampleDto = new CreateSampleDto(data)
    return this.repository.create(sample)
  }

  delete(id: number): Promise<boolean> {
    return this.repository.delete(id)
  }

  find(id: number): Promise<SampleEntity | null> {
    return this.repository.find(id)
  }

  findAll(): Promise<Array<SampleEntity>> {
    return this.repository.findAll()
  }

  update(id: number, data: UpdateSampleDto): Promise<boolean> {
    const sample: UpdateSampleDto = new UpdateSampleDto(data)
    return this.repository.update(id, sample)
  }

  updateField(id: number, key: string, value: any): Promise<boolean> {
    console.log({ id, key, value })
    return Promise.resolve(false)
  }
}
