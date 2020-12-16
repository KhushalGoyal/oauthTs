import Client from "./client.interface";
import User from "./user.interface";

interface OAuthAccessToken {
  accessToken: string;
  accessTokenExpiresAt?: Date;
  scope?: string | string[];
  client: Client;
  user: User;
}

export default OAuthAccessToken;
