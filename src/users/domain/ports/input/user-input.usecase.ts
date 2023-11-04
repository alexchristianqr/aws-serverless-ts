import { UserEntity } from "../../entities/user.entity.ts"
import { ICreateSampleDto } from "../../../application/dtos/create-sample.dto.ts"
import { IUpdateSampleDto } from "../../../application/dtos/update-sample.dto.ts"
import { IGetSampleBasicDto } from "../../../application/dtos/get-sample-basic.dto.ts"

export abstract class UserInputUsecase {
  abstract createUser(data: ICreateSampleDto): Promise<ICreateSampleDto>
  abstract getUserById(id: number): Promise<UserEntity | null>
  abstract getUsers(): Promise<Array<IGetSampleBasicDto>>
  abstract updateUser(id: number, data: IUpdateSampleDto): Promise<boolean>
  abstract deleteUser(id: number): Promise<boolean>
}
