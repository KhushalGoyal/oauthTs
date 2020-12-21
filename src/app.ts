import express from "express";
import * as bodyParser from "body-parser";
import errorMiddleware from "./middleware/error-middleware";
import moongoose from "mongoose";
import { ConfigEnv, Config } from "./helpers/config";
import OauthController from "./controllers/oauth/oauth.controller";
import { clientModelImp } from "./controllers/client/client.model";
import { userModelImpl } from "./controllers/user/user.model";
class App {
  public app: express.Application;
  public config: Config;
  constructor() {
    this.app = express();
    this.config = ConfigEnv;
    this.connectDB();
    this.initializeMiddleware();
    this.initializeControllers();
    this.initializeErrorHandler();
    this.creatInitialClientAndUser();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {});
  }

  public connectDB() {
    const { MONGO_PORT, MONGO_DB, MONGO_HOST } = process.env;
    //   mongodb://localhost:27017/oauthServer
    // console.log(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
    moongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
  }

  public initializeMiddleware() {
    this.app.use(bodyParser.json());
  }

  public initializeControllers() {
    this.app.use(OauthController);
  }

  public initializeErrorHandler() {
    this.app.use(errorMiddleware);
  }

  public async creatInitialClientAndUser() {
    const client = await clientModelImp.getClinetByClientId(
      "MANAGEMENT_PORTAL"
    );
    const user = await userModelImpl.getUserByName("khushalg123");
    if (!client) {
      await clientModelImp.createStaticClient();
    }
    if (!user) {
      await userModelImpl.createStaticUser();
    }
  }
}

export default App;
