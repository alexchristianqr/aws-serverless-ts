import { UserController as MyController } from "./user.controller.ts";
import { BaseController } from "../../../@common/controllers/base.controller.ts";
import { CI_APIGatewayProxyEvent as Event, CI_Context as Context, IRoutes, resourceIsValid } from "../../../@common";

export class RouterController extends BaseController {
  routesMap(event: Event, controller: MyController): IRoutes {
    return {
      GET: [
        { path: "/users", callback: () => controller.getUsers(event) },
        { path: "/users/{id}", callback: () => controller.getUserById(event) }
      ],
      POST: [{ path: "/users", callback: () => controller.createUser(event) }],
      PUT: [{ path: "/users/{id}", callback: () => controller.updateUser(event) }],
      DELETE: [{ path: "/users/{id}", callback: () => controller.deleteUser(event) }]
    };
  }
  selectResource(event: Event, context?: Context) {
    console.log("[RouterController.selectResource]", JSON.stringify({ event, context }));

    const controller = new MyController();

    const routes: IRoutes = this.routesMap(event, controller);

    const method: string | undefined | null = event?.httpMethod?.toUpperCase();
    if (!method) {
      throw new Error(`Método no válido: ${method}`);
    }

    const routesArray = routes[method] || [];

    for (const route of routesArray) {
      if (!resourceIsValid(event, route.path)) continue;
      return route.callback(event);
    }

    return this.response.error.apiResponse({ message: "Recurso no encontrado" });
  }
}
