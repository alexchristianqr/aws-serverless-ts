import { SampleController as MyController } from "./sample.controller.ts";
import { BaseController } from "../../../@common/controllers/base.controller.ts";
import { CI_APIGatewayProxyEvent as Event, CI_Context as Context, IRoutes, resourceIsValid } from "../../../@common";

export class RouterController extends BaseController {
  routesMap(event: Event, controller: MyController): IRoutes {
    return {
      GET: [
        { path: "/samples", callback: () => controller.getSamples(event) },
        { path: "/samples/{id}", callback: () => controller.getSampleById(event) }
      ],
      POST: [{ path: "/samples", callback: () => controller.createSample(event) }],
      PUT: [{ path: "/samples/{id}", callback: () => controller.updateSample(event) }],
      PATCH: [{ path: "/samples/{id}", callback: () => controller.updateFieldSample(event) }],
      DELETE: [{ path: "/samples/{id}", callback: () => controller.deleteSample(event) }]
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
