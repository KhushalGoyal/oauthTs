interface OAuthClient {
  name: string;
  client_id: string;
  client_secret: string;
  grants: string | string[];
  redirectUri: string | string[];
  scope: string | string[];
}
export default OAuthClient;
