import * as dotenv from "dotenv";
import App from "./app";
import OauthController from "./oauth/oauth.controller";
dotenv.config();

const app = new App();
app.listen();
