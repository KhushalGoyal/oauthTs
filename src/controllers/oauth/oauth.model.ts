import {
  BaseModel,
  Token,
  Falsey,
  RefreshToken,
  AuthorizationCode,
  User,
  Client,
} from "oauth2-server";
import OAuthClient from "../../interfaces/client.interface";
import OAuthUser from "../../interfaces/user.interface";
import { TokenHelper } from "../../helpers/tokenhelper";
import { Config, ConfigEnv } from "../../helpers/config";
import {
  userModel,
  clientModel,
  accessTokenModel,
  authorizationCodeModel,
} from "../../schemas";
import { OAuthAccessToken } from "../../interfaces/access-token.interface";
import { OAuthAuthorizationCode } from "../../interfaces/authorization-code.interface";
import { PasswordHelper } from "../../helpers/passwordhelper";
import { AppException, StatusCodes, ErrorCodes } from "../../response/base";
import { Types } from "mongoose";

export class OauthModel implements BaseModel {
  public async generateToken(payload: OAuthUser, client: OAuthClient) {
    return TokenHelper.generateToken(payload, {
      expiresIn: client.accessTokenLifetime
        ? client.accessTokenLifetime
        : ConfigEnv.get("ACCESS_TOKEN_LIFE_TIME"),
      audience: client.clientId,
      issuer: ConfigEnv.get("BASE_URL"),
    });
  }

  public async generateAccessToken(
    client: OAuthClient,
    user: OAuthUser,
    scope: string | string[]
  ): Promise<string> {
    const userPayload = (await userModel
      .findOne({ _id: user.id })
      .lean()) as OAuthUser;
    userPayload.scope = client.id;
    return this.generateToken(userPayload, client);
  }

  public async getClient(clientId: string): Promise<OAuthClient> {
    const filter = {
      clientId,
    };
    return (clientModel.findOne(filter).lean() as any) as OAuthClient;
  }

  public async saveToken(
    token: OAuthAccessToken,
    client: OAuthClient,
    user: OAuthUser
  ): Promise<Token | Falsey> {
    const accessToken = (
      await accessTokenModel.create({
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        scope: [],
        client: client.id,
        user: user._id,
      })
    ).toObject() as any;
    return accessToken;
  }

  public async getAccessToken(accessToken: string): Promise<Token | Falsey> {
    const filter = { accessToken };
    const _accessToken = (await accessTokenModel
      .findOne(filter)
      .populate("user")
      .populate("client")
      .lean()) as OAuthAccessToken;
    if (!_accessToken) {
      return false;
    }

    const _userAccessToken = _accessToken.toObject();

    if (!_userAccessToken.user) {
      // _userAccessToken.user = {};
    }
    return _userAccessToken;
  }

  public async getRefreshToken(refreshToken: string): Promise<RefreshToken> {
    return accessTokenModel
      .findOne({ refreshToken })
      .populate("user")
      .populate("client")
      .lean() as OAuthAccessToken;
  }

  public async getAuthorizationCode(
    authorizationCode: string
  ): Promise<AuthorizationCode> {
    const filter = { authorizationCode };
    return authorizationCodeModel
      .findOne(filter)
      .populate("user")
      .populate("client")
      .lean() as OAuthAuthorizationCode;
  }

  public async getUser(
    username: string,
    password: string
  ): Promise<User | Falsey> {
    const user = (await userModel.findOne({ username }).lean()) as any;

    if (
      user &&
      user.password &&
      PasswordHelper.compare(password, user.password)
    ) {
      delete user.password;
      return user;
    }
    return false;
  }

  public async saveAuthorizationCode(
    code: any,
    client: OAuthClient,
    user: User
  ): Promise<AuthorizationCode> {
    const isLoginEnabled = (await userModel
      .findOne({ _id: user._id, loginEnabled: true })
      .lean()) as any;
    if (!isLoginEnabled)
      AppException.create(
        StatusCodes.UNAUTHORIZED_ACCESS,
        "Login Is Not Enabled, Ask you admin to grant access",
        ErrorCodes.login_failure
      );
    return (await authorizationCodeModel.create({
      user: user._id,
      client: client._id,
      authorizationCode: code.authorizationCode,
      expiresAt: code.expiresAt,
      scope: code.scope,
    })) as AuthorizationCode;
  }

  public async revokeToken(accessToken: Token): Promise<boolean> {
    const result = (await accessTokenModel.deleteOne({
      refreshToken: accessToken.refreshToken,
    })) as any;
    return result.deletedCount > 0;
  }

  public async revokeAuthorizationCode(
    code: AuthorizationCode
  ): Promise<boolean> {
    const result = await authorizationCodeModel.deleteOne({
      authorizationCode: code.authorizationCode,
    });
    return result.deletedCount > 0;
  }

  public async logout(userId: string, clientId: string): Promise<any> {
    const client = await clientModel.findOne({ _id: clientId });
    return Promise.all([
      accessTokenModel.deleteMany({
        user: new Types.ObjectId(userId),
        client: new Types.ObjectId(client._id),
      }),
      authorizationCodeModel.deleteMany({ user: new Types.ObjectId(userId) }),
    ]);
  }

  public async getUserFromClient(client: Client): Promise<User> {
    return {} as User;
  }
}

export const OauthImpl = new OauthModel();
