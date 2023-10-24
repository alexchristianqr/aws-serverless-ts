import { SampleEntity } from "../../entities/sample.entity.ts"
import { CreateSampleDto } from "../../../application/dtos/create-sample.dto.ts"
import { UpdateSampleDto } from "../../../application/dtos/update-sample.dto.ts"

export interface SampleInputService {
  create(data: CreateSampleDto): Promise<boolean>
  find(id: number): Promise<SampleEntity | null>
  findAll(): Promise<Array<SampleEntity>>
  update(id: number, data: UpdateSampleDto): Promise<boolean>
  delete(id: number): Promise<boolean>
  updateField(id: number, key: string, value: any): Promise<boolean>
}
