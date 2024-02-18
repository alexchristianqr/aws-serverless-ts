import { SampleEntity } from "../../domain/entities/sample.entity.ts";

export abstract class IUpdateSampleDto extends SampleEntity {}

export class UpdateSampleDto extends IUpdateSampleDto {
  constructor(data?: IUpdateSampleDto) {
    super();

    this.name = data?.name;
    this.lastname = data?.lastname;
    this.age = data?.age;
  }
}
