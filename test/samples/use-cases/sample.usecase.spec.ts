import { SampleUsecase } from "../../../src/samples/application/use-cases/sample.usecase"
import { SampleLocalRepository } from "../../../src/samples/infrastructure/database/repositories/sample-local.repository"
import { CreateSampleDto, ICreateSampleDto } from "../../../src/samples/application/dtos/create-sample.dto"
import { LambdafunctionAdapterService } from "../../../src/core/services/adapters/lambdafunction-adapter.service"
import { CI_InvokeCommandInput, CV_LogType } from "../../../src/core"

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

    const input: CI_InvokeCommandInput = {
      FunctionName: "user-lambdafunction", //arn:aws:lambda:us-east-1:744984787614:function:user-lambdafunctiontr
      InvocationType: "Event", // RequestResponse, Event
      Payload: JSON.stringify({
        httpMethod: "GET",
        resource: "/users/{id}"
      }),
      LogType: CV_LogType.Tail
    }
    const respuestaInvocada: any = await LambdafunctionAdapterService.invokeFunction(input)
    console.log(JSON.stringify(respuestaInvocada))

    const id = result?.id

    result = await repository.find(id)
    expect(result).toEqual(sample)
  })
})
