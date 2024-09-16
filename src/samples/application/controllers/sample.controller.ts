import { HttpStatusCodes, proxyEventMiddleware } from "../../../@common";
import { SampleUsecase } from "../use-cases/sample.usecase.ts";
import { BaseController } from "../../../@common/controllers/base.controller.ts";
import { SampleMysqlRepository } from "../../infrastructure/database/repositories/sample-mysql.repository.ts";

export class SampleController extends BaseController {
  private readonly sampleUsecase: SampleUsecase = new SampleUsecase(new SampleMysqlRepository());
  private result: any;

  async createSample(event: any) {
    console.log("[SampleController.createSample]");

    try {
      const payload = await proxyEventMiddleware(event, "body");
      this.result = await this.sampleUsecase.createSample(payload);

      return this.response.send.apiResponse({
        message: "Sample created",
        result: this.result,
        status: HttpStatusCodes.CREATED
      });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async deleteSample(event: any) {
    console.log("[SampleController.deleteSample]");

    try {
      const payload = await proxyEventMiddleware(event, "params");
      const { id } = payload;
      this.result = await this.sampleUsecase.deleteSample(id);

      return this.response.send.apiResponse({ message: "Sample deleted", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async getSampleById(event: any) {
    console.log("[SampleController.getSampleById]");

    try {
      const payload = await proxyEventMiddleware(event, "params");
      const { id } = payload;
      this.result = await this.sampleUsecase.getSampleById(id);

      return this.response.send.apiResponse({ message: "Single sample", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async getSamples(event: any) {
    console.log("[SampleController.getSamples]");

    try {
      const payload = await proxyEventMiddleware(event, "query");
      this.result = await this.sampleUsecase.getSamples(payload);

      return this.response.send.apiResponse({ message: "All samples", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async updateSample(event: any) {
    console.log("[SampleController.updateSample]");

    try {
      const payload = await proxyEventMiddleware(event, "body|params");
      const { id, ...data } = payload;
      this.result = await this.sampleUsecase.updateSample(id, data);

      return this.response.send.apiResponse({ message: "Sample updated", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async updateFieldSample(event: any) {
    console.log("[SampleController.updateFieldSample]");

    try {
      const payload = await proxyEventMiddleware(event, "query|body|params");
      const { id, ...data } = payload;
      this.result = await this.sampleUsecase.updateFieldSample(id, data);

      return this.response.send.apiResponse({ message: "Sample patched", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }
}
