"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OauthImpl = exports.OauthModel = void 0;
const tokenhelper_1 = require("../helpers/tokenhelper");
const config_1 = require("../helpers/config");
const schemas_1 = require("../schemas");
const passwordhelper_1 = require("../helpers/passwordhelper");
const base_1 = require("../response/base");
const mongoose_1 = require("mongoose");
class OauthModel {
  async generateToken(payload, client) {
    return tokenhelper_1.TokenHelper.generateToken(payload, {
      expiresIn: client.accessTokenLifetime
        ? client.accessTokenLifetime
        : config_1.ConfigEnv.get("ACCESS_TOKEN_LIFE_TIME"),
      audience: client.clientId,
      issuer: config_1.ConfigEnv.get("BASE_URL"),
    });
  }
  async generateAccessToken(client, user, scope) {
    let userPayload = await schemas_1.userModel
      .findOne({ _id: user.id })
      .lean();
    userPayload.scope = client.id;
    return this.generateToken(userPayload, client);
  }
  async getClient(clientId, clientSecret) {
    return schemas_1.clientModel
      .findOne({ clientId: clientId, clientSecret: clientSecret })
      .lean();
  }
  async saveToken(token, client, user) {
    const accessToken = (
      await schemas_1.accessTokenModel.create({
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        scope: [],
        client: client.id,
        user: user._id,
      })
    ).toObject();
    return accessToken;
  }
  async getAccessToken(accessToken) {
    const _accessToken = await schemas_1.accessTokenModel
      .findOne({ accessToken: accessToken })
      .populate("user")
      .populate("client")
      .lean();
    if (!_accessToken) {
      return false;
    }
    const _userAccessToken = _accessToken.toObject();
    if (!_userAccessToken.user) {
      // _userAccessToken.user = {};
    }
    return _userAccessToken;
  }
  async getRefreshToken(refreshToken) {
    return schemas_1.accessTokenModel
      .findOne({ refreshToken: refreshToken })
      .populate("user")
      .populate("client")
      .lean();
  }
  async getAuthorizationCode(code) {
    return schemas_1.authorizationCodeModel
      .findOne({ authorizationCode: code })
      .populate("user")
      .populate("client")
      .lean();
  }
  async getUser(username, password) {
    const user = await schemas_1.userModel.findOne({ username }).lean();
    if (
      user &&
      user.password &&
      passwordhelper_1.PasswordHelper.compare(password, user.password)
    ) {
      delete user.password;
      return user;
    }
    return false;
  }
  async saveAuthorizationCode(code, client, user) {
    const isLoginEnabled = await schemas_1.userModel
      .findOne({ _id: user._id, loginEnabled: true })
      .lean();
    if (!isLoginEnabled)
      base_1.AppException.create(
        base_1.StatusCodes.UNAUTHORIZED_ACCESS,
        "Login Is Not Enabled, Ask you admin to grant access",
        base_1.ErrorCodes.login_failure
      );
    return await schemas_1.authorizationCodeModel.create({
      user: user._id,
      client: client._id,
      authorizationCode: code.authorizationCode,
      expiresAt: code.expiresAt,
      scope: code.scope,
    });
  }
  async revokeToken(accessToken) {
    const result = await schemas_1.accessTokenModel.deleteOne({
      refreshToken: accessToken.refreshToken,
    });
    return result.deletedCount > 0;
  }
  async revokeAuthorizationCode(code) {
    const result = await schemas_1.authorizationCodeModel.deleteOne({
      authorizationCode: code.authorizationCode,
    });
    return result.deletedCount > 0;
  }
  async logout(userId, clientId) {
    const client = await schemas_1.clientModel.findOne({ _id: clientId });
    return Promise.all([
      schemas_1.accessTokenModel.deleteMany({
        user: new mongoose_1.Types.ObjectId(userId),
        client: new mongoose_1.Types.ObjectId(client._id),
      }),
      schemas_1.authorizationCodeModel.deleteMany({
        user: new mongoose_1.Types.ObjectId(userId),
      }),
    ]);
  }
  async getUserFromClient(client) {
    return {};
  }
}
exports.OauthModel = OauthModel;
exports.OauthImpl = new OauthModel();
//# sourceMappingURL=oauth.model.js.map
