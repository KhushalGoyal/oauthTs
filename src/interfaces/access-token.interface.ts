import Client from "./client.interface";
import User from "./user.interface";
import { Document } from "mongoose";

export interface OAuthAccessToken extends Document {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  scope?: string | string[];
  client: Client;
  user: User;
}
