import { HttpStatusCodes } from "../../enums"

interface Body {
  statusCode?: HttpStatusCodes
  success?: boolean
  message?: string
  detail?: any
  error?: Error
}

interface Payload {
  body: Omit<Body, "error">
}

interface Response {
  statusCode: HttpStatusCodes
  body: string
}

export class ErrorResponseService {
  private payload: Payload = {
    body: { message: "Internal server error", success: false, detail: null, statusCode: HttpStatusCodes.INTERNAL_SERVER }
  }
  private response: Response = { statusCode: HttpStatusCodes.INTERNAL_SERVER, body: JSON.stringify(this.payload.body) }

  async apiResponse(payload: Body): Promise<Response> {
    this.payload.body.statusCode = payload?.statusCode || HttpStatusCodes.INTERNAL_SERVER
    this.payload.body.success = payload?.success || false
    this.payload.body.message = payload?.error?.message || payload?.message
    this.payload.body.detail = payload?.error?.stack

    this.response.statusCode = this.payload.body.statusCode
    this.response.body = JSON.stringify(this.payload.body)

    return this.response
  }
}
