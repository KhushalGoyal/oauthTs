class BaseResponse {
  public success: boolean;

  public message: any;

  protected constructor(success: boolean) {
    this.success = success;
  }

  protected setMessage(message: any): void {
    if (message) this.message = message;
  }
}

export class SuccessResponse extends BaseResponse {
  constructor(message?: any) {
    super(true);
    this.setMessage(message);
  }
}

export class ErrorResponse extends BaseResponse {
  private errorCode: string;
  constructor(message: any, errorCode?: string) {
    super(false);
    this.errorCode = errorCode;
    this.setMessage(message);
  }
}

export enum ErrorCodes {
  access_token_missing = "access_token_missing",
  signup_failure = "signup_failure",
  login_failure = "login_failure",
  invalid_user_type = "invalid_user_type",
  validation_error = "validation_error",
  ftp_error = "ftp_error",
  insured_feed_processing = "insured_feed_processing",
  invaid_consent = "invaid_consent",
  file_upload_error = "file_upload_error",
  token_expired = "token_expired",
  api_key_missing = "api_key_missing",
  invalid_request = "invalid_request",
  otp_verification_failure = "otp_verification_failure",
  email_verification_failure = "email_verification_failure",
}

export const StatusCodes = {
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED_ACCESS: 401,
  UNPROCESSED_ENTITY: 403,
  OK: 200,
  BAD_REQUEST: 400,
};

export class AppException extends Error {
  public statusCode: number;
  public serviceType: string | undefined;
  public errorCode: string | undefined;
  constructor(
    statusCode: number,
    message: string,
    errorCode?: string,
    serviceType?: string
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.statusCode = statusCode;
    this.message = message;
    if (errorCode) this.errorCode = errorCode;
    if (serviceType) this.serviceType = serviceType;
  }

  static create(
    statusCode: number,
    message: string,
    errorCode?: string,
    serviceType?: string
  ) {
    throw new AppException(statusCode, message, errorCode, serviceType);
  }
}
