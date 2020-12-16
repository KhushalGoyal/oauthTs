"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  const stack = error.stack ? error.stack : "-";
  response.status(status).send({
    status,
    message,
    stack,
  });
}
exports.default = errorMiddleware;
//# sourceMappingURL=error-middleware.js.map
