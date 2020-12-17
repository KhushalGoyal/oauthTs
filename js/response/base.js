"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppException = exports.StatusCodes = exports.ErrorCodes = exports.ErrorResponse = exports.SuccessResponse = void 0;
class BaseResponse {
  constructor(success) {
    this.success = success;
  }
  setMessage(message) {
    if (message) this.message = message;
  }
}
class SuccessResponse extends BaseResponse {
  constructor(message) {
    super(true);
    this.setMessage(message);
  }
}
exports.SuccessResponse = SuccessResponse;
class ErrorResponse extends BaseResponse {
  constructor(message, errorCode) {
    super(false);
    this.errorCode = errorCode;
    this.setMessage(message);
  }
}
exports.ErrorResponse = ErrorResponse;
var ErrorCodes;
(function (ErrorCodes) {
  ErrorCodes["access_token_missing"] = "access_token_missing";
  ErrorCodes["signup_failure"] = "signup_failure";
  ErrorCodes["login_failure"] = "login_failure";
  ErrorCodes["invalid_user_type"] = "invalid_user_type";
  ErrorCodes["validation_error"] = "validation_error";
  ErrorCodes["ftp_error"] = "ftp_error";
  ErrorCodes["insured_feed_processing"] = "insured_feed_processing";
  ErrorCodes["invaid_consent"] = "invaid_consent";
  ErrorCodes["file_upload_error"] = "file_upload_error";
  ErrorCodes["token_expired"] = "token_expired";
  ErrorCodes["api_key_missing"] = "api_key_missing";
  ErrorCodes["invalid_request"] = "invalid_request";
  ErrorCodes["otp_verification_failure"] = "otp_verification_failure";
  ErrorCodes["email_verification_failure"] = "email_verification_failure";
})((ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {})));
exports.StatusCodes = {
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED_ACCESS: 401,
  UNPROCESSED_ENTITY: 403,
  OK: 200,
  BAD_REQUEST: 400,
};
class AppException extends Error {
  constructor(statusCode, message, errorCode, serviceType) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.statusCode = statusCode;
    this.message = message;
    if (errorCode) this.errorCode = errorCode;
    if (serviceType) this.serviceType = serviceType;
  }
  static create(statusCode, message, errorCode, serviceType) {
    throw new AppException(statusCode, message, errorCode, serviceType);
  }
}
exports.AppException = AppException;
//# sourceMappingURL=base.js.map
