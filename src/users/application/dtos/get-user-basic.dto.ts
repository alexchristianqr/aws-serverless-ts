import { UserEntity } from "../../domain/entities/user.entity.ts";

export abstract class IGetUserBasicDto extends UserEntity {}

export class GetUserBasicDto extends IGetUserBasicDto {
  constructor(data: IGetUserBasicDto) {
    super();

    this.name = data.name;
    this.lastname = data.lastname;
  }
}
