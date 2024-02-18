import { UserEntity } from "../../domain/entities/user.entity.ts";

export abstract class ICreateUserDto extends UserEntity {}

export class CreateUserDto extends ICreateUserDto {
  constructor(data?: ICreateUserDto) {
    super();
    this.validate(data);

    this.id = data?.id;
    this.name = data?.name;
    this.lastname = data?.lastname;
    this.age = data?.age;
  }

  validate(data?: ICreateUserDto) {
    if (!data) throw new Error("[data] no existe");
    if (!data?.id) throw new Error("[id] es necesario");
    if (!data?.name) throw new Error("[nombre] es necesario");
    if (!data?.lastname) throw new Error("[apellido] es necesario");
    if (!data?.age) throw new Error("[edad] es necesario");
  }
}
