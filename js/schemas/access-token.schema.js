"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenModel = void 0;
const mongoose_1 = require("mongoose");
const accessTokenSchema = new mongoose_1.Schema({
  accessToken: String,
  accessTokenExpiresAt: Date,
  refreshToken: String,
  refreshTokenExpiresAt: Date,
  scope: Array,
  client: { type: mongoose_1.Types.ObjectId, ref: "Client", required: true },
  user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
});
exports.accessTokenModel = mongoose_1.model("AccessToken", accessTokenSchema);
//# sourceMappingURL=access-token.schema.js.map
