"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const error_middleware_1 = __importDefault(
  require("./middleware/error-middleware")
);
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./helpers/config");
const oauth_controller_1 = __importDefault(require("./oauth/oauth.controller"));
class App {
  constructor() {
    this.app = express_1.default();
    this.config = config_1.ConfigEnv;
    console.log(this.config);
    this.connectDB();
    this.initializeMiddleware();
    this.initializeControllers();
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
    // console.log(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
    mongoose_1.default.connect(
      `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`
    );
  }
  initializeMiddleware() {
    this.app.use(bodyParser.json());
  }
  initializeControllers() {
    this.app.use(oauth_controller_1.default);
  }
  initializeErrorHandler() {
    this.app.use(error_middleware_1.default);
  }
}
exports.default = App;
//# sourceMappingURL=app.js.map
