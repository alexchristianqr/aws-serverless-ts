import { SampleEntity } from "../../domain/entities/sample.entity.ts";

export abstract class IGetSampleBasicDto extends SampleEntity {}

export class GetSampleBasicDto extends IGetSampleBasicDto {
  constructor(data: IGetSampleBasicDto) {
    super();

    this.name = data.name;
    this.lastname = data.lastname;
  }
}
