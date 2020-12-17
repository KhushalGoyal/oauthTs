import { Base } from "./base.interface";
interface OAuthUser extends Base {
  username: string;
  password: string;
  client_id: string;
  scope: string | string[];
}
export default OAuthUser;
