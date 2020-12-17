"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
  username: String,
  password: String,
  client: { type: mongoose_1.Types.ObjectId, ref: "Client", required: true },
  loginEnabled: Boolean,
});
exports.userModel = mongoose_1.model("User", userSchema);
//# sourceMappingURL=user.schema.js.map
