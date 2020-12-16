"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const error_middleware_1 = require("./middleware/error-middleware");
const mongoose = require("mongoose");
class App {
  constructor(controller) {
    this.app = express();
    this.connectDB();
    this.initializeMiddleware();
    this.initializeControllers(controller);
    this.initializeErrorHandler();
  }
  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }
  connectDB() {
    const { MONGO_PORT, MONGO_DB, MONGO_HOST } = process.env;
    //   mongodb://localhost:27017/oauthServer
    console.log(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
    mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
  }
  initializeMiddleware() {
    this.app.use(bodyParser.json());
  }
  initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
  initializeErrorHandler() {
    this.app.use(error_middleware_1.default);
  }
}
exports.default = App;
//# sourceMappingURL=app.js.map
