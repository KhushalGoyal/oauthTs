import { parse } from "dotenv";
import * as joi from "joi";
import * as fs from "fs";

/**
 * Key-value mapping
 */
export interface EnvConfig {
    [key: string]: string;
}

export interface LifeTimes {
    accessTokenLifeTime : number
    refreshTokenLifeTime : number
    authCodeLifeTime: number
}
/**
 * Config Service
 */
export class Config {
    /**
     * Object that will contain the injected environment variables
     */
    private readonly envConfig: EnvConfig;

    /**
     * Constructor
     * @param {string} filePath
     */
    constructor(filePath: string) {
        const config = parse(fs.readFileSync(filePath));
        this.envConfig = Config.validateInput(config);
    }

    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     * @param {EnvConfig} envConfig the configuration object with variables from the configuration file
     * @returns {EnvConfig} a validated environment configuration object
     */
    private static validateInput(envConfig: EnvConfig): EnvConfig {
        /**
         * A schema to validate envConfig against
         */
        const envVarsSchema: joi.ObjectSchema = joi.object({
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
            SALT: joi.string()
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
    get(key: string): string {
        return this.envConfig[key];
    }

    /**
     * Checks whether the application environment set in the configuration file matches the environment parameter
     * @param {string} env
     * @returns {boolean} Whether or not the environment variable matches the application environment
     */
    isEnv(env: string): boolean {
        return this.envConfig.APP_ENV === env;
    }
}


export const ConfigEnv = new Config('.env');