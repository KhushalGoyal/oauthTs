"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const scopeSchema = new mongoose_1.Schema({
  is_default: Boolean,
  scope: Array,
});
const scopeModel = mongoose_1.model("Scope", scopeSchema);
exports.default = scopeModel;
//# sourceMappingURL=scope.schema.js.map
