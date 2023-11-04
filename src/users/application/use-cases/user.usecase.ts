import { UserInputUsecase } from "../../domain/ports/input/user-input.usecase.ts"
import { UserOutputRepository } from "../../domain/ports/output/user-output.repository.ts"
import { UserEntity } from "../../domain/entities/user.entity.ts"
import { CreateUserDto, ICreateSampleDto } from "../dtos/create-user.dto.ts"
import { IUpdateUserDto, UpdateUserDto } from "../dtos/update-user.dto.ts"
import { GetUserBasicDto, IGetUserBasicDto } from "../dtos/get-user-basic.dto.ts"

interface Model extends UserEntity {}

export class UserUsecase implements UserInputUsecase {
  constructor(private readonly repository: UserOutputRepository<Model>) {}

  createUser(data: ICreateSampleDto): Promise<ICreateSampleDto> {
    const sample: ICreateSampleDto = new CreateUserDto(data)
    return this.repository.create(sample)
  }

  deleteUser(id: number): Promise<boolean> {
    return this.repository.delete(id)
  }

  getUserById(id: number): Promise<Model | null> {
    return this.repository.getById(id)
  }

  async getUsers(): Promise<Array<IGetUserBasicDto>> {
    const samples: Array<Model> = await this.repository.getAll()
    return samples.map((item: Model) => new GetUserBasicDto(item))
  }

  updateUser(id: number, data: IUpdateUserDto): Promise<boolean> {
    const sample: IUpdateUserDto = new UpdateUserDto(data)
    return this.repository.update(id, sample)
  }
}
