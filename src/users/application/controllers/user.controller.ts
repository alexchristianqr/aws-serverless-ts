import { CoreService, HttpStatusCodes, CI_APIGatewayProxyEvent, CI_Context, IRoutes } from "../../../@core";
import { UserLocalRepository } from "../../infrastructure/database/repositories/user-local.repository.ts";
import { UserUsecase } from "../use-cases/user.usecase.ts";
import { CreateUserDto } from "../dtos/create-user.dto.ts";
import { UpdateUserDto } from "../dtos/update-user.dto.ts";
import { Model } from "../../domain/entities/user.entity.ts";

export class UserController extends CoreService<Model> {
  private readonly sampleUsecase: UserUsecase = new UserUsecase(new UserLocalRepository());
  private result: any;

  constructor(event: CI_APIGatewayProxyEvent, context: CI_Context) {
    console.log("[UserController.constructor]");
    super(event, context);
  }

  selectResource() {
    console.log("[UserController.selectResource]");

    const routes: IRoutes = {
      GET: [
        { path: "/users", callback: () => this.getUsers() },
        { path: "/users/{id}", callback: () => this.getUserById(this.params.id) }
      ],
      POST: [{ path: "/users", callback: () => this.createUser(this.body.payload) }],
      PUT: [{ path: "/users/{id}", callback: () => this.updateUser(this.params.id, this.body.payload) }],
      DELETE: [{ path: "/users/{id}", callback: () => this.deleteUser(this.params.id) }]
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

  async createUser(data: CreateUserDto) {
    console.log("[UserController.create]", { data });

    try {
      this.result = await this.sampleUsecase.createUser(data);
      return this.response.send.apiResponse({
        message: "Sample created",
        result: this.result,
        statusCode: HttpStatusCodes.CREATED
      });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async deleteUser(id: number) {
    console.log("[UserController.delete]", { id });

    try {
      this.result = await this.sampleUsecase.deleteUser(id);
      return this.response.send.apiResponse({ message: "Delete user", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async getUserById(id: number) {
    console.log("[UserController.getUserById]", { id });

    try {
      this.result = await this.sampleUsecase.getUserById(id);
      return this.response.send.apiResponse({ message: "Single user", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async getUsers() {
    console.log("[UserController.getUsers]");

    try {
      this.result = await this.sampleUsecase.getUsers();
      return this.response.send.apiResponse({ message: "All users", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }

  async updateUser(id: number, data: UpdateUserDto) {
    console.log("[UserController.updateUser]", { id, data });

    try {
      await this.sampleUsecase.updateUser(id, data);
      return this.response.send.apiResponse({ message: "Update user", result: this.result });
    } catch (error) {
      return this.response.error.apiResponse({ error: error });
    }
  }
}
