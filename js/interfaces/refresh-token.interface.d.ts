import Client from "./client.interface";
import User from "./user.interface";
interface OAuthRefreshToken {
  refreshToken: string;
  refreshTokenExpiresAt?: Date;
  scope?: string | string[];
  client: Client;
  user: User;
}
export default OAuthRefreshToken;
