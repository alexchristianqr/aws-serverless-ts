import { MessageResponseInterface } from "../interfaces";

export const MESSAGE_RESPONSE_GENERAL: MessageResponseInterface = {
  statusCode: 500,
  title: "¡Uy ocurrio un error!",
  subtitle: "Esto puede deberse a un error interno, comuníquese con el área de soporte."
};

export const HttpConstant = {
  OK_STATUS: { code: 200, description: "OK" },
  CREATED_STATUS: { code: 201, description: "CREATED" },
  NO_CONTENT_STATUS: { code: 204, description: "NO CONTENT" },
  BAD_REQUEST_STATUS: { code: 400, description: "BAD REQUEST" },
  UNAUTHORIZED_STATUS: { code: 401, description: "UNAUTHORIZED" },
  FORBIDDEN_STATUS: { code: 403, description: "FORBIDDEN" },
  NOT_FOUND_STATUS: { code: 404, description: "NOT FOUND" },
  UNPROCESSABLE_ENTITY_STATUS: { code: 422, description: "UNPROCESSABLE ENTITY" },
  INTERNAL_SERVER_ERROR_STATUS: { code: 500, description: "INTERNAL SERVER ERROR" },
  BAD_GATEWAY_STATUS: { code: 502, description: "BAD GATEWAY" },
  GATEWAY_TIMEOUT_STATUS: { code: 504, description: "GATEWAY TIMEOUT" }
} as const;

export const APP_EXCEPTION = {
  REQUEST_LMB_CONSUMER: "LMB",
  REQUEST_AWS_CONSUMER: "AWS",
  TRACE_START_MESSAGE: "TRACE START:",
  TRACE_END_MESSAGE: "TRACE END:",
  DB_ERROR: { code: "ERROR-0001", message: "Database Error" },
  REQUEST_BODY_ERROR: { code: "ERROR-0002", message: "Request Structure Body Error" },
  VALIDATION_ERROR: { code: "ERROR-0003", description: "Data Validation Error" },
  REQUEST_HANDLER_ERROR: { code: "ERROR-0004", description: "Request Handler Error" },
  UNHANDLED_ERROR: { code: "ERROR-0005", description: "Unhandled Error" },
  SEND_EMAIL_ERROR: { code: "ERROR-0006", description: "Send Email Error" },
  INTERNAL_ERROR: { code: "ERROR-0007", description: "Internal Error" },
  IDENTITY_NOT_FOUND: { code: "ERROR-0008", description: "Identity Not Found" },
  ID_CLIENT_NOT_FOUND: { code: "ERROR-0009", description: "Id Client Not Found" },
  USER_SESSION_NOT_FOUND: { code: "ERROR-0010", description: "User Session Not Found" },
  USER_SESSION_EXPIRED: { code: "ERROR-0011", description: "User Session Expired" },
  DUPLICATED_SESSION_ERROR: { code: "ERROR-0012", description: "Duplicated Session Error" },
  REQUEST_LAMBDA_ERROR: { code: "ERROR-0013", description: "Request Lambda Error" },
  TIMER_DATES_VALIDATION: { code: "ERROR-0014", description: "Start Date and End Date must have value" },
  DB_TIMEOUT_ERROR: { code: "ERROR-0015", message: "Database Timeout Error" }
} as const;

