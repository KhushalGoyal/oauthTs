"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const refreshTokenSchema = new mongoose_1.Schema({
  refreshToken: String,
  refreshTokenExpiresAt: Date,
  scope: Array,
  client: { type: mongoose_1.Types.ObjectId, ref: "Client", required: true },
  user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
});
const refreshTokenModel = mongoose_1.model("RefreshToken", refreshTokenSchema);
exports.default = refreshTokenModel;
//# sourceMappingURL=refresh-token.schema.js.map
