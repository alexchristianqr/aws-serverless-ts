import { SampleInputUsecase } from "../../domain/ports/input/sample-input.usecase.ts";
import { SampleOutputRepository } from "../../domain/ports/output/sample-output.repository.ts";
import { SampleEntity } from "../../domain/entities/sample.entity.ts";
import { CreateSampleDto, ICreateSampleDto } from "../dtos/create-sample.dto.ts";
import { IUpdateSampleDto, UpdateSampleDto } from "../dtos/update-sample.dto.ts";
import { GetSampleBasicDto, IGetSampleBasicDto } from "../dtos/get-sample-basic.dto.ts";

interface Model extends SampleEntity {}

export class SampleUsecase implements SampleInputUsecase {
  constructor(private readonly repository: SampleOutputRepository<Model>) {}

  createSample(data: ICreateSampleDto): Promise<ICreateSampleDto> {
    const sample: ICreateSampleDto = new CreateSampleDto(data);
    return this.repository.create(sample);
  }

  deleteSample(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }

  getSampleById(id: number): Promise<Model | null> {
    return this.repository.getById(id);
  }

  async getSamples(): Promise<Array<IGetSampleBasicDto>> {
    const samples: Array<Model> = await this.repository.getAll();
    return samples.map((item: Model) => new GetSampleBasicDto(item));
  }

  updateSample(id: number, data: IUpdateSampleDto): Promise<boolean> {
    const sample: IUpdateSampleDto = new UpdateSampleDto(data);
    return this.repository.update(id, sample);
  }
}
