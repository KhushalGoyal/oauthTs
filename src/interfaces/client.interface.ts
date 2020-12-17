import { Client } from "oauth2-server";

interface OAuthClient extends Client {
  name: string;
  clientId: string;
  clientSecret: string;
}

export default OAuthClient;
