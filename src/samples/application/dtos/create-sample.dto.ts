import { SampleEntity } from "../../domain/entities/sample.entity.ts"

abstract class ICreateSampleDto extends SampleEntity {}

export class CreateSampleDto extends ICreateSampleDto {
  constructor(data: CreateSampleDto) {
    super()

    this.id = data.id
    this.name = data.name
    this.lastname = data.lastname
    this.age = data.age

    this.validate()
  }

  validate() {
    if (!this.id) throw new Error("El id es necesario")
    if (!this.name) throw new Error("El nombre es necesario")
    if (!this.lastname) throw new Error("El apellido es necesario")
    return this
  }
}
