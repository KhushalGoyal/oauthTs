import { BaseModel, Token, Falsey } from "oauth2-server";
import OAuthClient from "../interfaces/client.interface";
import OAuthUser from "../interfaces/user.interface";
import { OAuthAccessToken } from "../interfaces/access-token.interface";
export declare class OauthModel implements BaseModel {
  generateToken(payload: OAuthUser, client: OAuthClient): Promise<string>;
  generateAccessToken(
    client: OAuthClient,
    user: OAuthUser,
    scope: string | string[]
  ): Promise<string>;
  getClient(clientId: string, clientSecret: string): Promise<OAuthClient>;
  saveToken(
    token: OAuthAccessToken,
    client: OAuthClient,
    user: OAuthUser
  ): Promise<Token | Falsey>;
}
export declare const OauthImpl: OauthModel;
