"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = exports.Authentication = void 0;
const base_1 = require("../response/base");
const passwordhelper_1 = require("../helpers/passwordhelper");
const buffer_utils_1 = require("../helpers/buffer-utils");
const schemas_1 = require("../schemas");
const mongoose_1 = require("mongoose");
const user_not_found = "Username or Email not found";
const user_is_not_loggedin = "User Is not Logged In";
async function Authentication(req, res, next) {
  try {
    const payload = req.body;
    const user = await schemas_1.userModel.findOne({
      username: payload.username,
    });
    if (!user)
      base_1.AppException.create(
        base_1.StatusCodes.UNAUTHORIZED_ACCESS,
        user_not_found,
        "user_not_found"
      );
    if (
      user &&
      passwordhelper_1.PasswordHelper.compare(req.body.password, user.password)
    ) {
      req.body.user = user;
      next();
    } else {
      base_1.AppException.create(
        base_1.StatusCodes.UNAUTHORIZED_ACCESS,
        "Invalid Password",
        "invalid_password"
      );
    }
  } catch (err) {
    next(err);
  }
}
exports.Authentication = Authentication;
/**
 * Used at the time of authorization ( when user is already logged in with another client)
 * @param req - request payload
 * @param res - response handler
 * @param next - next middleware
 */
async function Authorization(req, res, next) {
  try {
    const body = req.body;
    const decode = buffer_utils_1.BufferUtits.atob(body.user);
    const iamUser = await schemas_1.accessTokenModel
      .findOne({
        user: new mongoose_1.Types.ObjectId(decode),
        refreshTokenExpiresAt: { $gt: new Date() },
      })
      .lean();
    if (iamUser) {
      const payload = await schemas_1.userModel.findById(decode);
      delete payload.password;
      req.body.user = payload;
      next();
    } else {
      res
        .status(base_1.StatusCodes.UNAUTHORIZED_ACCESS)
        .send(
          new base_1.ErrorResponse(
            user_is_not_loggedin,
            base_1.ErrorCodes.login_failure
          )
        );
    }
  } catch (err) {
    res
      .status(base_1.StatusCodes.UNAUTHORIZED_ACCESS)
      .send(new base_1.ErrorResponse(err.message));
  }
}
exports.Authorization = Authorization;
//# sourceMappingURL=oauth-middleware.js.map
