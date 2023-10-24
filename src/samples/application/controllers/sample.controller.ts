import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy"
import { ProxyEventMiddleware } from "../../../core/middlewares/proxy-event.middleware.ts"
import { SampleLocalRepository } from "../../infrastructure/database/repositories/sample-local.repository.ts"
import { SampleEntity } from "../../domain/entities/sample.entity.ts"
import { SendResponseService } from "../../../core/responses/send-response.service.ts"
import { ErrorResponseService } from "../../../core/responses/error-response.service.ts"
import { HttpStatusCodes } from "../../../core/responses/http-status-code.enum.ts"
import { SampleUsecase } from "../use-cases/sample.usecase.ts"
import { CreateSampleDto } from "../dtos/create-sample.dto.ts"
import { UpdateSampleDto } from "../dtos/update-sample.dto.ts"

interface Model extends SampleEntity {}

export class SampleController extends ProxyEventMiddleware<Model> {
  private readonly repository: SampleLocalRepository = new SampleLocalRepository()
  private readonly sampleUsecase: SampleUsecase = new SampleUsecase(this.repository)
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

  async create(data: CreateSampleDto) {
    console.log("[SampleController.create]", { data })

    try {
      this.result = await this.sampleUsecase.create(data)
      return this.response.send.apiResponse({ message: "Sample created", result: this.result, statusCode: HttpStatusCodes.CREATED })
    } catch (error) {
      return this.response.error.apiResponse({ error: error })
    }
  }

  async delete(id: number) {
    console.log("[SampleController.delete]", { id })

    try {
      this.result = await this.sampleUsecase.delete(id)
      return this.response.send.apiResponse({ message: "Delete sample", result: this.result })
    } catch (error) {
      return this.response.error.apiResponse({ error: error })
    }
  }

  async find(id: number) {
    console.log("[SampleController.find]", { id })

    try {
      this.result = await this.sampleUsecase.find(id)
      return this.response.send.apiResponse({ message: "Single sample", result: this.result })
    } catch (error) {
      return this.response.error.apiResponse({ error: error })
    }
  }

  async findAll() {
    console.log("[SampleController.findAll]")

    try {
      this.result = await this.sampleUsecase.findAll()
      return this.response.send.apiResponse({ message: "All samples", result: this.result })
    } catch (error) {
      return this.response.error.apiResponse({ error: error })
    }
  }

  async update(id: number, data: UpdateSampleDto) {
    console.log("[SampleController.update]", { id, data })

    try {
      await this.sampleUsecase.update(id, data)
      return this.response.send.apiResponse({ message: "Update sample", result: this.result })
    } catch (error) {
      return this.response.error.apiResponse({ error: error })
    }
  }
}
