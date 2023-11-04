import { UserInputUsecase } from "../../domain/ports/input/user-input.usecase.ts"
import { UserOutputRepository } from "../../domain/ports/output/user-output.repository.ts"
import { UserEntity } from "../../domain/entities/user.entity.ts"
import { CreateSampleDto, ICreateSampleDto } from "../dtos/create-sample.dto.ts"
import { IUpdateSampleDto, UpdateSampleDto } from "../dtos/update-sample.dto.ts"
import { GetSampleBasicDto, IGetSampleBasicDto } from "../dtos/get-sample-basic.dto.ts"

interface Model extends UserEntity {}

export class UserUsecase implements UserInputUsecase {
  constructor(private readonly repository: UserOutputRepository<Model>) {}

  createUser(data: ICreateSampleDto): Promise<ICreateSampleDto> {
    const sample: ICreateSampleDto = new CreateSampleDto(data)
    return this.repository.create(sample)
  }

  deleteUser(id: number): Promise<boolean> {
    return this.repository.delete(id)
  }

  getUserById(id: number): Promise<Model | null> {
    return this.repository.getById(id)
  }

  async getUsers(): Promise<Array<IGetSampleBasicDto>> {
    const samples: Array<Model> = await this.repository.getAll()
    return samples.map((item: Model) => new GetSampleBasicDto(item))
  }

  updateUser(id: number, data: IUpdateSampleDto): Promise<boolean> {
    const sample: IUpdateSampleDto = new UpdateSampleDto(data)
    return this.repository.update(id, sample)
  }
}
