"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
  name: String,
  client_id: String,
  client_secret: String,
  grants: Array,
  refirectUri: Array,
  scope: Array,
});
const clientModel = mongoose_1.model("Client", clientSchema);
exports.default = clientModel;
//# sourceMappingURL=client.schema.js.map
