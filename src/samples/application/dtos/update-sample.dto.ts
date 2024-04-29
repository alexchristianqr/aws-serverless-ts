import { SampleEntity } from "../../domain/entities/sample.entity.ts";

export abstract class IUpdateSampleDto extends SampleEntity {}

export class UpdateSampleDto extends IUpdateSampleDto {
  constructor(data?: IUpdateSampleDto) {
    super();

    this.title = data?.title;
    this.description = data?.description;
  }
}
