import { UserEntity } from "../../domain/entities/user.entity.ts";

export abstract class IUpdateUserDto extends UserEntity {}

export class UpdateUserDto extends IUpdateUserDto {
  constructor(data?: IUpdateUserDto) {
    super();

    this.name = data?.name;
    this.lastname = data?.lastname;
    this.age = data?.age;
  }
}
