import { HttpStatusCodes, proxyEventMiddleware } from "../../../@common";
import { SampleLocalRepository } from "../../infrastructure/database/repositories/sample-local.repository.ts";
import { SampleUsecase } from "../use-cases/sample.usecase.ts";
import { BaseController } from "../../../@common/controllers/base.controller.ts";

export class SampleController extends BaseController {
  private readonly sampleUsecase: SampleUsecase = new SampleUsecase(new SampleLocalRepository());
  private result: any;

  async createSample(event: any) {
    console.log("[SampleController.createSample]");

    try {
      const { payload } = await proxyEventMiddleware(event, "body");
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

  async deleteSample(event: any) {
    console.log("[SampleController.deleteSample]");

    try {
      const { id } = await proxyEventMiddleware(event, "params");
      this.result = await this.sampleUsecase.deleteSample(id);
      return this.response.send.apiResponse({ message: "Delete sample", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async getSampleById(event: any) {
    console.log("[SampleController.getSampleById]");

    try {
      const { id } = await proxyEventMiddleware(event, "params");
      this.result = await this.sampleUsecase.getSampleById(id);
      return this.response.send.apiResponse({ message: "Single sample", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async getSamples(event: any) {
    console.log("[SampleController.getSamples]");

    try {
      const {} = await proxyEventMiddleware(event, "query");
      this.result = await this.sampleUsecase.getSamples();
      return this.response.send.apiResponse({ message: "All samples", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async updateSample(event: any) {
    console.log("[SampleController.updateSample]");

    try {
      const { id, payload } = await proxyEventMiddleware(event, "body|params");
      await this.sampleUsecase.updateSample(id, payload);
      return this.response.send.apiResponse({ message: "Update sample", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }
}
