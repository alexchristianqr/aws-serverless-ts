import { SampleEntity } from "./sample.entity.ts"

export class SampleModel extends SampleEntity {
  constructor(sample?: SampleModel) {
    super()
    this.id = sample?.id
    this.name = sample?.name
  }
}
