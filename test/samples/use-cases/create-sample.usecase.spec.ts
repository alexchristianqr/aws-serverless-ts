import { SampleUsecase } from "../../../src/samples/application/use-cases/sample.usecase"
import { SampleLocalRepository } from "../../../src/samples/infrastructure/database/repositories/sample-local.repository"
import { CreateSampleDto, ICreateSampleDto } from "../../../src/samples/application/dtos/create-sample.dto"

describe("Sample use case", () => {
  let repository: SampleLocalRepository
  let usecase: SampleUsecase
  let result = null

  beforeEach(() => {
    repository = new SampleLocalRepository()
    usecase = new SampleUsecase(repository)
  })

  it("Create sample test", async () => {
    const sample: ICreateSampleDto = new CreateSampleDto({
      id: 1,
      name: "Alex",
      lastname: "Quispe",
      age: "28"
    })

    result = await usecase.create(sample)
    expect(result).toEqual(sample)

    const id = result?.id

    result = await repository.find(id)
    expect(result).toEqual(sample)
  })
})
