import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy"
import { ProxyEventMiddleware } from "../../../shared/middlewares/proxy-event.middleware.ts"
import { CreateSampleUsecase, ICreateSampleUsecase } from "../../application/use-cases/create-sample.usecase.ts"
import { SampleLocalRepository } from "../../domain/repositories/sample-local.repository.ts"
import { FindSampleUsecase } from "../../application/use-cases/find-sample.usecase.ts"
import { FindallSampleUsecase } from "../../application/use-cases/findall-sample.usecase.ts"
import { SampleEntity } from "../../domain/entities/sample.entity.ts"
import { UpdateSampleUsecase } from "../../application/use-cases/update-sample.usecase.ts"
import { DeleteSampleUsecase } from "../../application/use-cases/delete-sample.usecase.ts"
import { UserLocalRepository } from "../../../users/domain/repositories/user-local.repository.ts"

interface Model extends SampleEntity {}

export class SampleController extends ProxyEventMiddleware<Model> {
  private repository: SampleLocalRepository = new SampleLocalRepository()
  private userRepository: UserLocalRepository = new UserLocalRepository()
  private result: any = null

  constructor(event: APIGatewayProxyEvent) {
    super(event)
    console.log("[SampleController.constructor]")

    console.log(this.userRepository)
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
          body: JSON.stringify({ success: false, message: "Metodo http no soportado" })
        }
    }
  }

  async create(data: ICreateSampleUsecase) {
    console.log("[SampleController.create]", { data })

    try {
      const createSampleUsecase = new CreateSampleUsecase(this.repository)
      await createSampleUsecase.execute(data)
      return {
        statusCode: 201,
        body: JSON.stringify({ success: true, result: this.result, event: this.event.requestContext })
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: error })
      }
    }
  }

  async delete(id: number) {
    console.log("[SampleController.delete]", { id })

    try {
      const deleteSampleUsecase = new DeleteSampleUsecase(this.repository)
      this.result = await deleteSampleUsecase.execute(id)
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, result: this.result, event: this.event.requestContext })
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: error })
      }
    }
  }

  async find(id: number) {
    console.log("[SampleController.find]", { id })

    try {
      const findSampleUsecase = new FindSampleUsecase(this.repository)
      this.result = await findSampleUsecase.execute(id)
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, result: this.result, event: this.event.requestContext })
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: error })
      }
    }
  }

  async findAll() {
    console.log("[SampleController.findAll]")

    try {
      const findallSampleUsecase = new FindallSampleUsecase(this.repository)
      this.result = await findallSampleUsecase.execute()
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, result: this.result, event: this.event.requestContext })
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: error })
      }
    }
  }

  async update(id: number, data: Model) {
    console.log("[SampleController.update]", { id, data })

    try {
      const updateSampleUsecase = new UpdateSampleUsecase(this.repository)
      await updateSampleUsecase.execute(id, data)
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, result: this.result, event: this.event.requestContext })
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: error })
      }
    }
  }
}
