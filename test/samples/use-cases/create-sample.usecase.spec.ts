import { CreateSampleUsecase } from "../../../src/samples/application/use-cases/create-sample.usecase"
import { SampleLocalRepository } from "../../../src/samples/domain/repositories/sample-local.repository"
import { SampleModel } from "../../../src/samples/domain/entities/sample.model"

describe("Sample use case", () => {
  let repository: SampleLocalRepository
  let usecase: CreateSampleUsecase
  let result = null

  beforeEach(() => {
    // you can mock entire instance instead an adapter
    repository = new SampleLocalRepository()
    usecase = new CreateSampleUsecase(repository)
  })

  it("Create sample test", async () => {
    const sample = new SampleModel()
    sample.id = 1
    sample.name = "Alex"

    result = await usecase.execute(sample)
    console.log({ result })
    expect(result).toEqual(true)

    result = await repository.find(sample.id)
    console.log({ result })
    expect(result).toEqual({ id: 1, name: "Alex" })
  })
})
