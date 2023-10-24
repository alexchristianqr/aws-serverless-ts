import { SampleInputService } from "../../domain/ports/input/sample-input.service.ts"
import { SampleOutputRepository } from "../../domain/ports/output/sample-output.repository.ts"
import { SampleEntity } from "../../domain/entities/sample.entity.ts"
import { CreateSampleDto, ICreateSampleDto } from "../dtos/create-sample.dto.ts"
import { IUpdateSampleDto, UpdateSampleDto } from "../dtos/update-sample.dto.ts"
import { GetSampleBasicDto, IGetSampleBasicDto } from "../dtos/get-sample-basic.dto.ts"

interface Model extends SampleEntity {}

export class SampleUsecase implements SampleInputService {
  constructor(private readonly repository: SampleOutputRepository<Model>) {}

  create(data: ICreateSampleDto): Promise<ICreateSampleDto> {
    const sample: ICreateSampleDto = new CreateSampleDto(data)
    return this.repository.create(sample)
  }

  delete(id: number): Promise<boolean> {
    return this.repository.delete(id)
  }

  find(id: number): Promise<Model | null> {
    return this.repository.find(id)
  }

  async findAll(): Promise<Array<IGetSampleBasicDto>> {
    const samples: Array<Model> = await this.repository.findAll()
    return samples.map((item: Model) => new GetSampleBasicDto(item))
  }

  update(id: number, data: IUpdateSampleDto): Promise<boolean> {
    const sample: IUpdateSampleDto = new UpdateSampleDto(data)
    return this.repository.update(id, sample)
  }

  updateField(id: number, key: string, value: any): Promise<boolean> {
    console.log({ id, key, value })
    return Promise.resolve(false)
  }
}
