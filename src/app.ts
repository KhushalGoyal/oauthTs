import * as express from "express";
import Controller from "./interfaces/controller.interface";
import * as bodyParser from "body-parser";
import errorMiddleware from "./middleware/error-middleware";
import * as mongoose from "mongoose";

class App {
  public app: express.Application;
  constructor(controller: Controller[]) {
    this.app = express();

    this.connectDB();
    this.initializeMiddleware();
    this.initializeControllers(controller);
    this.initializeErrorHandler();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      // console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public connectDB() {
    const { MONGO_PORT, MONGO_DB, MONGO_HOST } = process.env;
    //   mongodb://localhost:27017/oauthServer
    // console.log(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
    mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
  }

  public initializeMiddleware() {
    this.app.use(bodyParser.json());
  }

  public initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public initializeErrorHandler() {
    this.app.use(errorMiddleware);
  }
}

export default App;
