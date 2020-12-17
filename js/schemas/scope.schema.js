"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopeModel = void 0;
const mongoose_1 = require("mongoose");
const scopeSchema = new mongoose_1.Schema({
  is_default: Boolean,
  scope: Array,
});
exports.scopeModel = mongoose_1.model("Scope", scopeSchema);
//# sourceMappingURL=scope.schema.js.map
