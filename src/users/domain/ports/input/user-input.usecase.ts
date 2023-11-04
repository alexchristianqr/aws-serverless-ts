import { UserEntity } from "../../entities/user.entity.ts"
import { ICreateSampleDto } from "../../../application/dtos/create-user.dto.ts"
import { IUpdateSampleDto } from "../../../application/dtos/update-user.dto.ts"
import { IGetSampleBasicDto } from "../../../application/dtos/get-user-basic.dto.ts"

export abstract class UserInputUsecase {
  abstract createUser(data: ICreateSampleDto): Promise<ICreateSampleDto>
  abstract getUserById(id: number): Promise<UserEntity | null>
  abstract getUsers(): Promise<Array<IGetSampleBasicDto>>
  abstract updateUser(id: number, data: IUpdateSampleDto): Promise<boolean>
  abstract deleteUser(id: number): Promise<boolean>
}
