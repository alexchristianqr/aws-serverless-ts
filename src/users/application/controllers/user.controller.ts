import { HttpStatusCodes, proxyEventMiddleware } from "../../../@common";
import { UserLocalRepository } from "../../infrastructure/database/repositories/user-local.repository.ts";
import { UserUsecase } from "../use-cases/user.usecase.ts";
import { BaseController } from "../../../@common/controllers/base.controller.ts";

export class UserController extends BaseController {
  private readonly sampleUsecase: UserUsecase = new UserUsecase(new UserLocalRepository());
  private result: any;

  async createUser(event: any) {
    console.log("[UserController.create]");

    try {
      const { payload } = await proxyEventMiddleware(event, "body");
      this.result = await this.sampleUsecase.createUser(payload);
      return this.response.send.apiResponse({
        message: "Sample created",
        result: this.result,
        statusCode: HttpStatusCodes.CREATED
      });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async deleteUser(event: any) {
    console.log("[UserController.delete]");

    try {
      const { id } = await proxyEventMiddleware(event, "params");
      this.result = await this.sampleUsecase.deleteUser(id);
      return this.response.send.apiResponse({ message: "Delete user", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async getUserById(event: any) {
    console.log("[UserController.getUserById]");

    try {
      const { id } = await proxyEventMiddleware(event, "params");
      this.result = await this.sampleUsecase.getUserById(id);
      return this.response.send.apiResponse({ message: "Single user", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async getUsers(event: any) {
    console.log("[UserController.getUsers]");

    try {
      const {} = await proxyEventMiddleware(event, "query");
      this.result = await this.sampleUsecase.getUsers();
      return this.response.send.apiResponse({ message: "All users", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async updateUser(event: any) {
    console.log("[UserController.updateUser]");

    try {
      const { id, payload } = await proxyEventMiddleware(event, "body|params");
      await this.sampleUsecase.updateUser(id, payload);
      return this.response.send.apiResponse({ message: "Update user", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }
}
