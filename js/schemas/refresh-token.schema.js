"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenModel = void 0;
const mongoose_1 = require("mongoose");
const refreshTokenSchema = new mongoose_1.Schema({
  refreshToken: String,
  refreshTokenExpiresAt: Date,
  scope: Array,
  client: { type: mongoose_1.Types.ObjectId, ref: "Client", required: true },
  user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
});
exports.refreshTokenModel = mongoose_1.model(
  "RefreshToken",
  refreshTokenSchema
);
//# sourceMappingURL=refresh-token.schema.js.map
