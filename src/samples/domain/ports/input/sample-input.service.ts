import { SampleEntity } from "../../entities/sample.entity.ts"
import { ICreateSampleDto } from "../../../application/dtos/create-sample.dto.ts"
import { IUpdateSampleDto } from "../../../application/dtos/update-sample.dto.ts"
import { IGetSampleBasicDto } from "../../../application/dtos/get-sample-basic.dto.ts"

export abstract class SampleInputService {
  abstract create(data: ICreateSampleDto): Promise<ICreateSampleDto>
  abstract find(id: number): Promise<SampleEntity | null>
  abstract findAll(): Promise<Array<IGetSampleBasicDto>>
  abstract update(id: number, data: IUpdateSampleDto): Promise<boolean>
  abstract delete(id: number): Promise<boolean>
  abstract updateField(id: number, key: string, value: any): Promise<boolean>
}
