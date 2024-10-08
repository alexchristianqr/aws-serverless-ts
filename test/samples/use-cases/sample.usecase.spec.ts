import { SampleUsecase } from "../../../src/samples/application/use-cases/sample.usecase";
import { SampleLocalRepository } from "../../../src/samples/infrastructure/database/repositories/sample-local.repository";
import { CreateSampleDto, ICreateSampleDto } from "../../../src/samples/application/dtos/create-sample.dto";
// import { CI_InvokeCommandInput, CV_LogType, LambdafunctionAdapterService } from "../../../src/@common";

describe("Sample use case", () => {
  let repository: SampleLocalRepository;
  let usecase: any;
  let result;

  beforeEach(() => {
    repository = new SampleLocalRepository();
    usecase = new SampleUsecase(repository);
  });

  // it("All samples test", async () => {
  //   const input: CI_InvokeCommandInput = {
  //     FunctionName: "AWSTEMPLATE-dev-SAMPLES_MODULE_LF", // arn:aws:lambda:us-east-1:744984787614:function:user-lambdafunctiontr
  //     InvocationType: "Event", // RequestResponse, Event
  //     Payload: JSON.stringify({
  //       httpMethod: "GET",
  //       resource: "/samples"
  //     }),
  //     LogType: CV_LogType.Tail
  //   };
  //   const respuestaInvocada: any = await LambdafunctionAdapterService.invokeFunction(input);
  //   console.log(JSON.stringify(respuestaInvocada));
  // });

  it("Create sample test", async () => {
    const sample: ICreateSampleDto = new CreateSampleDto({
      id: 1,
      title: "Alex",
      description: "Quispe"
    });

    result = await usecase.createSample(sample);
    console.log(result);
    expect(result).toEqual(sample);
    const id = result?.id;

    result = await repository.getById(id);
    console.log(result);
    expect(result).toEqual(sample);
  });
});
