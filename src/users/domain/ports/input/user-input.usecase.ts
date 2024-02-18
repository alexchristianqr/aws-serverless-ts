import { UserEntity } from "../../entities/user.entity.ts";
import { ICreateUserDto } from "../../../application/dtos/create-user.dto.ts";
import { IUpdateUserDto } from "../../../application/dtos/update-user.dto.ts";
import { IGetUserBasicDto } from "../../../application/dtos/get-user-basic.dto.ts";

export abstract class UserInputUsecase {
  abstract createUser(data: ICreateUserDto): Promise<ICreateUserDto> | undefined;
  abstract getUserById(id: number): Promise<UserEntity | null>;
  abstract getUsers(): Promise<Array<IGetUserBasicDto>>;
  abstract updateUser(id: number, data: IUpdateUserDto): Promise<boolean>;
  abstract deleteUser(id: number): Promise<boolean>;
}
