"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationCodeModel = void 0;
const mongoose_1 = require("mongoose");
const authorizationCodeSchema = new mongoose_1.Schema({
  authorizationCode: String,
  expiresAt: Date,
  redirectUri: String,
  scope: Array,
  client: { type: mongoose_1.Types.ObjectId, ref: "Client", required: true },
  user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
});
exports.authorizationCodeModel = mongoose_1.model(
  "AuthorizationCode",
  authorizationCodeSchema
);
//# sourceMappingURL=authorization-code.schema.js.map
