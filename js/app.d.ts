import * as express from "express";
import { Controller } from "./interfaces/controller.interface";
import { Config } from "./helpers/config";
declare class App {
  app: express.Application;
  config: Config;
  constructor(controller: Controller[]);
  listen(): void;
  connectDB(): void;
  initializeMiddleware(): void;
  initializeControllers(controllers: Controller[]): void;
  initializeErrorHandler(): void;
}
export default App;
