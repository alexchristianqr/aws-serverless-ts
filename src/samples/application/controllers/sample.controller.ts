import { CoreService, HttpStatusCodes, CI_APIGatewayProxyEvent, CI_Context, IRoutes } from "../../../core";
import { SampleLocalRepository } from "../../infrastructure/database/repositories/sample-local.repository.ts";
import { Model } from "../../domain/entities/sample.entity.ts";
import { SampleUsecase } from "../use-cases/sample.usecase.ts";
import { CreateSampleDto } from "../dtos/create-sample.dto.ts";
import { UpdateSampleDto } from "../dtos/update-sample.dto.ts";

export class SampleController extends CoreService<Model> {
  private readonly sampleUsecase: SampleUsecase = new SampleUsecase(new SampleLocalRepository());
  private result: any;

  constructor(event: CI_APIGatewayProxyEvent, context: CI_Context) {
    console.log("[SampleController.constructor]");
    super(event, context);
  }

  selectResource() {
    console.log("[SampleController.selectResource]");

    const routes: IRoutes = {
      GET: [
        { path: "/samples", callback: () => this.getSamples() },
        { path: "/samples/{id}", callback: () => this.getSampleById(this.params.id) }
      ],
      POST: [{ path: "/samples", callback: () => this.createSample(this.body.payload) }],
      PUT: [{ path: "/samples/{id}", callback: () => this.updateSample(this.params.id, this.body.payload) }],
      DELETE: [{ path: "/samples/{id}", callback: () => this.deleteSample(this.params.id) }]
    };

    const method: string | undefined | null = this.event?.httpMethod?.toUpperCase();
    if (!method) {
      throw new Error(`Método no válido: ${method}`);
    }
    const routesArray = routes[method] || [];

    for (const route of routesArray) {
      if (!this.resourceIsValid(route.path)) continue;
      return route.callback();
    }

    return this.response.error.apiResponse({ message: "Recurso no encontrado" });
  }

  async createSample(payload: CreateSampleDto) {
    console.log("[SampleController.createSample]", { payload });

    try {
      this.result = await this.sampleUsecase.createSample(payload);
      return this.response.send.apiResponse({
        message: "Sample created",
        result: this.result,
        statusCode: HttpStatusCodes.CREATED
      });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async deleteSample(id: number) {
    console.log("[SampleController.deleteSample]", { id });

    try {
      this.result = await this.sampleUsecase.deleteSample(id);
      return this.response.send.apiResponse({ message: "Delete sample", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async getSampleById(id: number) {
    console.log("[SampleController.getSampleById]", { id });

    try {
      this.result = await this.sampleUsecase.getSampleById(id);
      return this.response.send.apiResponse({ message: "Single sample", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async getSamples() {
    console.log("[SampleController.getSamples]");

    try {
      this.result = await this.sampleUsecase.getSamples();
      return this.response.send.apiResponse({ message: "All samples", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async updateSample(id: number, payload: UpdateSampleDto) {
    console.log("[SampleController.updateSample]", { id, payload });

    try {
      await this.sampleUsecase.updateSample(id, payload);
      return this.response.send.apiResponse({ message: "Update sample", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }
}
