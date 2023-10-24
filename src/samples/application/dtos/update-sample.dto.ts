import { SampleEntity } from "../../domain/entities/sample.entity.ts"

abstract class IUpdateSampleDto extends SampleEntity {}

export class UpdateSampleDto extends IUpdateSampleDto {
  constructor(data?: UpdateSampleDto) {
    super()

    this.name = data?.name
    this.lastname = data?.lastname
    this.age = data?.age

    this.validate()
  }

  validate() {
    if (!this.name) throw new Error("El nombre es necesario")
    if (!this.lastname) throw new Error("El apellido es necesario")
    if (!this.age) throw new Error("La edad es necesario")
    return this
  }
}
