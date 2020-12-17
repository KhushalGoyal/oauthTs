"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenHelper = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const sceretKey = "jijaijyFTATyagsyg76767hashda8dans";
class TokenHelper {
  static generateToken(payload, config) {
    return jsonwebtoken_1.sign(payload, sceretKey, config);
  }
  static verifyToken(token, verifyOptions) {
    return jsonwebtoken_1.verify(token, sceretKey, verifyOptions);
  }
  static decodeToken(token) {
    return jsonwebtoken_1.decode(token);
  }
}
exports.TokenHelper = TokenHelper;
//# sourceMappingURL=tokenhelper.js.map
