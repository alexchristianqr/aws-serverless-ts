import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy"
import { ProxyEventMiddleware } from "../../../core/middlewares/proxy-event.middleware.ts"
import { CreateSampleUsecase, ICreateSampleUsecase } from "../../application/use-cases/create-sample.usecase.ts"
import { SampleLocalRepository } from "../../domain/repositories/sample-local.repository.ts"
import { FindSampleUsecase } from "../../application/use-cases/find-sample.usecase.ts"
import { FindallSampleUsecase } from "../../application/use-cases/findall-sample.usecase.ts"
import { SampleEntity } from "../../domain/entities/sample.entity.ts"
import { UpdateSampleUsecase } from "../../application/use-cases/update-sample.usecase.ts"
import { DeleteSampleUsecase } from "../../application/use-cases/delete-sample.usecase.ts"
import { SendResponseService } from "../../../core/responses/send-response.service.ts"
import { ErrorResponseService } from "../../../core/responses/error-response.service.ts"
import { HttpStatusCodes } from "../../../core/responses/http-status-code.enum.ts"

interface Model extends SampleEntity {}

export class SampleController extends ProxyEventMiddleware<Model> {
  private readonly repository: SampleLocalRepository = new SampleLocalRepository()
  private readonly response: any = { send: new SendResponseService(), error: new ErrorResponseService() }
  private result: any

  constructor(event: APIGatewayProxyEvent) {
    console.log("[SampleController.constructor]")
    super(event)
  }

  async selectResource() {
    console.log("[SampleController.selectResource]")

    switch (this.event.httpMethod) {
      case "GET":
        if (this.event.resource === "/samples") {
          return this.findAll()
        } else if (this.event.resource === "/samples/{id}") {
          return this.find(this.params.id)
        }
        break
      case "POST":
        if (this.event.resource === "/samples") {
          return this.create(this.body.payload)
        }
        break
      case "PUT":
        if (this.event.resource === "/samples/{id}") {
          return this.update(this.params.id, this.body.payload)
        }
        break
      case "DELETE":
        if (this.event.resource === "/samples/{id}") {
          return this.delete(this.params.id)
        }
        break
      default:
        return {
          statusCode: 500,
          body: JSON.stringify({ success: false, message: "Recurso no encontrado" })
        }
    }
  }

  async create(data: ICreateSampleUsecase) {
    console.log("[SampleController.create]", { data })

    try {
      const createSampleUsecase = new CreateSampleUsecase(this.repository)
      await createSampleUsecase.execute(data)
      return this.response.send.apiResponse({ message: "Sample created", statusCode: HttpStatusCodes.CREATED })
    } catch (error) {
      return this.response.error.apiResponse({ error: error })
    }
  }

  async delete(id: number) {
    console.log("[SampleController.delete]", { id })

    try {
      const deleteSampleUsecase = new DeleteSampleUsecase(this.repository)
      this.result = await deleteSampleUsecase.execute(id)
      return this.response.send.apiResponse({ message: "Delete sample", result: this.result })
    } catch (error) {
      return this.response.error.apiResponse({ error: error })
    }
  }

  async find(id: number) {
    console.log("[SampleController.find]", { id })

    try {
      const findSampleUsecase = new FindSampleUsecase(this.repository)
      this.result = await findSampleUsecase.execute(id)
      return this.response.send.apiResponse({ message: "Single sample", result: this.result })
    } catch (error) {
      return this.response.error.apiResponse({ error: error })
    }
  }

  async findAll() {
    console.log("[SampleController.findAll]")

    try {
      const findallSampleUsecase = new FindallSampleUsecase(this.repository)
      this.result = await findallSampleUsecase.execute()
      return this.response.send.apiResponse({ message: "All samples", result: this.result })
    } catch (error) {
      return this.response.error.apiResponse({ error: error })
    }
  }

  async update(id: number, data: Model) {
    console.log("[SampleController.update]", { id, data })

    try {
      const updateSampleUsecase = new UpdateSampleUsecase(this.repository)
      await updateSampleUsecase.execute(id, data)
      return this.response.send.apiResponse({ message: "Update sample", result: this.result })
    } catch (error) {
      return this.response.error.apiResponse({ error: error })
    }
  }
}
