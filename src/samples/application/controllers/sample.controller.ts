import { SampleLocalRepository } from "../../infrastructure/database/repositories/sample-local.repository.ts"
import { SampleEntity } from "../../domain/entities/sample.entity.ts"
import { SampleUsecase } from "../use-cases/sample.usecase.ts"
import { CreateSampleDto } from "../dtos/create-sample.dto.ts"
import { UpdateSampleDto } from "../dtos/update-sample.dto.ts"
import { CoreService, HttpStatusCodes, CI_APIGatewayProxyEvent, CI_Context } from "../../../core"

interface Route {
  path: string
  callback: Function
}
interface IRoutes {
  [key: string]: Route[]
}
interface Model extends SampleEntity {}

export class SampleController extends CoreService<Model> {
  private readonly repository: SampleLocalRepository = new SampleLocalRepository()
  private readonly sampleUsecase: SampleUsecase = new SampleUsecase(this.repository)
  private result: any

  constructor(event: CI_APIGatewayProxyEvent, context: CI_Context) {
    console.log("[SampleController.constructor]")
    super(event, context)
  }

  resourceIsValid(path: string) {
    return this.event.resource === path
  }

  async selectResource() {
    console.log("[SampleController.selectResource]")

    const routes: IRoutes = {
      GET: [
        { path: "/samples", callback: () => this.findAll() },
        { path: "/samples/{id}", callback: () => this.find(this.params.id) }
      ],
      POST: [{ path: "/samples", callback: () => this.create(this.body.payload) }],
      PUT: [{ path: "/samples/{id}", callback: () => this.update(this.params.id, this.body.payload) }],
      DELETE: [{ path: "/samples/{id}", callback: () => this.delete(this.params.id) }]
    }

    const method: string | undefined | null = this.event?.httpMethod?.toUpperCase()
    if (!method) {
      throw new Error(`Método no válido: ${method}`)
    }
    const routesArray = routes[method] || []

    for (const route of routesArray) {
      if (!this.resourceIsValid(route.path)) continue
      return route.callback()
    }

    return this.response.error.apiResponse({ message: "Recurso no encontrado" })
  }

  async create(data: CreateSampleDto) {
    console.log("[SampleController.create]", { data })

    try {
      this.result = await this.sampleUsecase.create(data)
      return this.response.send.apiResponse({
        message: "Sample created",
        result: this.result,
        statusCode: HttpStatusCodes.CREATED
      })
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
      //
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
