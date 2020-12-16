import * as express from "express";
import Controller from "./interfaces/controller.interface";
declare class App {
  app: express.Application;
  constructor(controller: Controller[]);
  listen(): void;
  connectDB(): void;
  initializeMiddleware(): void;
  initializeControllers(controllers: Controller[]): void;
  initializeErrorHandler(): void;
}
export default App;
