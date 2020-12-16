"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
  username: Boolean,
  password: Array,
  client: { type: mongoose_1.Types.ObjectId, ref: "Client", required: true },
});
const userModel = mongoose_1.model("Scope", userSchema);
exports.default = userModel;
//# sourceMappingURL=user.schema.js.map
