import { SampleEntity } from "../../entities/sample.entity.ts";
import { ICreateSampleDto } from "../../../application/dtos/create-sample.dto.ts";
import { IUpdateSampleDto } from "../../../application/dtos/update-sample.dto.ts";
import { IGetSampleBasicDto } from "../../../application/dtos/get-sample-basic.dto.ts";

export abstract class SampleInputUsecase {
  abstract createSample(data: ICreateSampleDto): Promise<ICreateSampleDto>;
  abstract getSampleById(id: number): Promise<SampleEntity | null>;
  abstract getSamples(): Promise<Array<IGetSampleBasicDto>>;
  abstract updateSample(id: number, data: IUpdateSampleDto): Promise<boolean>;
  abstract deleteSample(id: number): Promise<boolean>;
}
