import { UserEntity } from "../../domain/entities/user.entity.ts"

export abstract class IGetSampleBasicDto extends UserEntity {}

export class GetSampleBasicDto extends IGetSampleBasicDto {
  constructor(data: IGetSampleBasicDto) {
    super()

    this.name = data.name
    this.lastname = data.lastname
  }
}
