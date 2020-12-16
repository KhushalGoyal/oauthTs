import Client from "./client.interface";
import User from "./user.interface";
interface OAuthAuthorizationCode {
  authorizationCode: string;
  expiresAt: Date;
  redirectUri: string;
  scope?: string | string[];
  client: Client;
  user: User;
}
export default OAuthAuthorizationCode;
