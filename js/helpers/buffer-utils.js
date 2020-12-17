"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferUtits = void 0;
class BufferUtits {
  static btoa(value) {
    return Buffer.from(value, "binary").toString("base64");
  }
  static atob(value) {
    return Buffer.from(value, "base64").toString("binary");
  }
}
exports.BufferUtits = BufferUtits;
//# sourceMappingURL=buffer-utils.js.map
