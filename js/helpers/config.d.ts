/**
 * Key-value mapping
 */
export interface EnvConfig {
  [key: string]: string;
}
export interface LifeTimes {
  accessTokenLifeTime: number;
  refreshTokenLifeTime: number;
  authCodeLifeTime: number;
}
/**
 * Config Service
 */
export declare class Config {
  /**
   * Object that will contain the injected environment variables
   */
  private readonly envConfig;
  /**
   * Constructor
   * @param {string} filePath
   */
  constructor(filePath: string);
  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   * @param {EnvConfig} envConfig the configuration object with variables from the configuration file
   * @returns {EnvConfig} a validated environment configuration object
   */
  private static validateInput;
  /**
   * Fetches the key from the configuration file
   * @param {string} key
   * @returns {string} the associated value for a given key
   */
  get(key: string): string;
  /**
   * Checks whether the application environment set in the configuration file matches the environment parameter
   * @param {string} env
   * @returns {boolean} Whether or not the environment variable matches the application environment
   */
  isEnv(env: string): boolean;
}
export declare const ConfigEnv: Config;
