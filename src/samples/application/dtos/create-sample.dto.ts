import { SampleEntity } from "../../domain/entities/sample.entity.ts";

export abstract class ICreateSampleDto extends SampleEntity {}

export class CreateSampleDto extends ICreateSampleDto {
  constructor(data?: ICreateSampleDto) {
    super();
    this.validate(data);

    this.id = data?.id;
    this.title = data?.title;
    this.description = data?.description;
  }

  validate(data?: ICreateSampleDto) {
    if (!data) throw new Error("[data] no existe");
    if (!data?.title) throw new Error("[titulo] es necesario");
    if (!data?.description) throw new Error("[descripcion] es necesario");
  }
}
