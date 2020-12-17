"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauth = void 0;
const oauth2_server_1 = __importDefault(require("oauth2-server"));
const oauth_model_1 = require("./oauth.model");
const config_1 = require("../helpers/config");
exports.oauth = new oauth2_server_1.default({
  model: oauth_model_1.OauthImpl,
  allowEmptyState: true,
  authorizationCodeLifetime: config_1.ConfigEnv.get(
    "AUTHORIZATION_CODE_LIFE_TIME"
  ),
  authenticateHandler: { handle: (reqs) => reqs.body.user },
  accessTokenLifetime: config_1.ConfigEnv.get("ACCESS_TOKEN_LIFE_TIME"),
  refreshTokenLifetime: config_1.ConfigEnv.get("REFRESH_TOKEN_LIFE_TIME"),
  requireClientAuthentication: {
    authorization_code: true,
    refresh_token: true,
  },
});
//# sourceMappingURL=oauth.config.js.map
