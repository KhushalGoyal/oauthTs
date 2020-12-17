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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigEnv = exports.Config = void 0;
const dotenv_1 = require("dotenv");
const joi = __importStar(require("joi"));
const fs = __importStar(require("fs"));
/**
 * Config Service
 */
class Config {
  /**
   * Constructor
   * @param {string} filePath
   */
  constructor(filePath) {
    const config = dotenv_1.parse(fs.readFileSync(filePath));
    this.envConfig = Config.validateInput(config);
  }
  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   * @param {EnvConfig} envConfig the configuration object with variables from the configuration file
   * @returns {EnvConfig} a validated environment configuration object
   */
  static validateInput(envConfig) {
    /**
     * A schema to validate envConfig against
     */
    const envVarsSchema = joi.object({
      APP_ENV: joi.string().valid("dev", "prod").default("dev"),
      MONGO_DB: joi.string(),
      MONGO_PORT: joi.number(),
      MONGO_HOST: joi.string(),
      PORT: joi.number(),
      ACCESS_TOKEN_LIFE_TIME: joi.number(),
      REFRESH_TOKEN_LIFE_TIME: joi.number(),
      AUTHORIZATION_CODE_LIFE_TIME: joi.number(),
      BASE_URL: joi.string().uri({
        scheme: [/http?/],
      }),
      SALT: joi.string(),
    });
    /**
     * Represents the status of validation check on the configuration file
     */
    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
  /**
   * Fetches the key from the configuration file
   * @param {string} key
   * @returns {string} the associated value for a given key
   */
  get(key) {
    return this.envConfig[key];
  }
  /**
   * Checks whether the application environment set in the configuration file matches the environment parameter
   * @param {string} env
   * @returns {boolean} Whether or not the environment variable matches the application environment
   */
  isEnv(env) {
    return this.envConfig.APP_ENV === env;
  }
}
exports.Config = Config;
exports.ConfigEnv = new Config(".env");
//# sourceMappingURL=config.js.map
