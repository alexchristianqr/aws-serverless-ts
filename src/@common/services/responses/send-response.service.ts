import { HttpStatusCodes } from "../../enums";

interface ResultPagination {
  data: any;
  pagination: {
    total: number; // Total de elementos en la base de datos
    per_page: number; // Elementos por página
    current_page: number; // Página actual
    last_page?: number; // Última página disponible
    next_page_url?: string; // URL para la siguiente página
    prev_page_url?: string | null; // URL para la página anterior (null si no hay)
    from?: number; // Primer elemento de la página actual
    to?: number; // Último elemento de la página actual
  };
}

interface Body {
  status?: HttpStatusCodes;
  success?: boolean;
  result?: ResultPagination | any;
  message: string | null;
}

interface Payload {
  body: Body;
}

interface Response {
  status: HttpStatusCodes;
  body: string;
}

export class SendResponseService {
  private payload: Payload = {
    body: { message: null, success: true, result: null, status: HttpStatusCodes.OK }
  };
  private response: Response = { status: HttpStatusCodes.OK, body: JSON.stringify(this.payload.body) };

  async apiResponse(payload: Body): Promise<Response> {
    this.payload.body.status = payload?.status || HttpStatusCodes.OK;
    this.payload.body.success = payload?.success || true;
    this.payload.body.result = payload?.result || undefined;
    this.payload.body.message = payload.message;

    this.response.status = this.payload.body.status;
    this.response.body = JSON.stringify(this.payload.body);

    return this.response;
  }
}
