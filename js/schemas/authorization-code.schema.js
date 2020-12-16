"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const authorizationCodeSchema = new mongoose_1.Schema({
  authorizationCode: String,
  expiresAt: Date,
  redirectUri: String,
  scope: Array,
  client: { type: mongoose_1.Types.ObjectId, ref: "Client", required: true },
  user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
});
const authorizationCodeModel = mongoose_1.model(
  "AuthorizationCode",
  authorizationCodeSchema
);
exports.default = authorizationCodeModel;
//# sourceMappingURL=authorization-code.schema.js.map
