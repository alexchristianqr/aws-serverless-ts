import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy"
import { ProxyEventMiddleware } from "../../../shared/middlewares/proxy-event.middleware.ts"
import { Sample } from "../../domain/entities/sample.ts"
import { SampleService } from "../../domain/services/sample.service.ts"
import { SampleLocalRepository } from "../../domain/repositories/sample-local.repository.ts"

export class SampleController extends ProxyEventMiddleware<Sample> {
  private service: SampleService
  private result: any = null

  constructor(event: APIGatewayProxyEvent) {
    console.log("[SampleController.constructor]")

    super(event)
    this.service = new SampleService(new SampleLocalRepository())
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
      default:
        return this.create(this.body.payload)
    }
  }

  async create(data: Sample) {
    try {
      await this.service.create(data)
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
    await this.service.delete(id)
    return {
      statusCode: 200,
      body: JSON.stringify({ result: this.result, event: this.event })
    }
  }

  async find(id: number) {
    this.result = await this.service.find(id)
    return {
      statusCode: 200,
      body: JSON.stringify({ result: this.result, event: this.event })
    }
  }

  async findAll() {
    const result = await this.service.findAll()
    return {
      statusCode: 201,
      body: JSON.stringify({ result, event: this.event })
    }
  }

  async update(id: number, data: Sample) {
    await this.service.update(id, data)
    return {
      statusCode: 201,
      body: JSON.stringify({ result: this.result, event: this.event })
    }
  }
}
