"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientModel = void 0;
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
  name: String,
  clientId: String,
  clientSecret: String,
  grants: Array,
  refirectUris: Array,
  scope: Array,
});
exports.clientModel = mongoose_1.model("Client", clientSchema);
//# sourceMappingURL=client.schema.js.map
