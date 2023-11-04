import { UserEntity } from "../../domain/entities/user.entity.ts"

export abstract class IUpdateSampleDto extends UserEntity {}

export class UpdateSampleDto extends IUpdateSampleDto {
  constructor(data?: IUpdateSampleDto) {
    super()

    this.name = data?.name
    this.lastname = data?.lastname
    this.age = data?.age
  }
}
