"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = exports.tokenHandler = exports.authHandler = void 0;
const express_1 = require("express");
const oauth2_server_1 = require("oauth2-server");
const url_1 = require("url");
const oauth_model_1 = require("./oauth.model");
const oauth_config_1 = require("./oauth.config");
const base_1 = require("../response/base");
const tokenhelper_1 = require("../helpers/tokenhelper");
const buffer_utils_1 = require("../helpers/buffer-utils");
const validator_1 = require("../helpers/validator");
const oauth_middleware_1 = require("../middleware/oauth-middleware");
const OauthController = express_1.Router();
const handleError = (err, req, res, response) => {
  const innerError = err.inner;
  if (response) res.set(response.headers);
  res.status(
    innerError && innerError.statusCode ? innerError.statusCode : err.code
  );
  res.send(
    new base_1.ErrorResponse(
      err.message,
      innerError && innerError.errorCode ? innerError.errorCode : null
    )
  );
};
exports.authHandler = async (req, res) => {
  const rq = new oauth2_server_1.Request(req);
  const rs = new oauth2_server_1.Response(res);
  try {
    const data = await oauth_config_1.oauth.authorize(rq, rs);
    let { location } = rs.headers;
    if (location.includes("#")) {
      const parser = url_1.parse(location);
      location = `${parser.protocol}//${parser.host}/${parser.hash}?${parser.query}`;
    }
    res.set(rs.headers);
    delete rs.headers.location;
    delete data._id;
    res.send(
      new base_1.SuccessResponse({
        redirect_uri: location,
        user: buffer_utils_1.BufferUtits.btoa(data.user.toString()),
        client: buffer_utils_1.BufferUtits.btoa(data.client.toString()),
        authorizationCode: data.authorizationCode,
        scope: data.scope,
      })
    );
  } catch (err) {
    handleError(err, req, res, rs);
  }
};
exports.tokenHandler = async (req, res) => {
  const rq = new oauth2_server_1.Request(req);
  const rs = new oauth2_server_1.Response(res);
  return oauth_config_1.oauth
    .token(rq, rs)
    .then(() => {
      res.set(rs.headers);
      res.status(rs.status).send(rs.body);
    })
    .catch((err) => {
      handleError(err, req, res, rs);
    });
};
exports.logoutHandler = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  if (!token) {
    res
      .status(base_1.StatusCodes.UNAUTHORIZED_ACCESS)
      .send(
        new base_1.ErrorResponse(
          "Access Token Not Found",
          base_1.ErrorCodes.access_token_missing
        )
      );
  } else {
    const user = tokenhelper_1.TokenHelper.decodeToken(token);
    await oauth_model_1.OauthImpl.logout(user._id, user.scope);
    res.status(200).send(new base_1.SuccessResponse());
  }
};
OauthController.get("/logout", exports.logoutHandler);
OauthController.post(
  "/authenticate",
  validator_1.AuthValidator.login(),
  oauth_middleware_1.Authentication,
  exports.authHandler
);
OauthController.post(
  "/authorize",
  oauth_middleware_1.Authorization,
  exports.authHandler
);
OauthController.post("/token", exports.tokenHandler);
exports.default = OauthController;
//# sourceMappingURL=oauth.controller.js.map
