import Client from "./client.interface";
import User from "./user.interface";

export interface OAuthAuthorizationCode {
  authorizationCode: string;
  expiresAt: Date;
  redirectUri: string;
  scope?: string | string[];
  client: Client;
  user: User;
}
