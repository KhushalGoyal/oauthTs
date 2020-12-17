"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const express_validator_1 = require("express-validator");
class AuthValidator {
  static login() {
    return [
      express_validator_1
        .body("username")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid Email"),
      express_validator_1
        .body("password")
        .notEmpty()
        .withMessage("Password is empty"),
    ];
  }
}
exports.AuthValidator = AuthValidator;
//# sourceMappingURL=validator.js.map
