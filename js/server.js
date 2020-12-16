"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const app_1 = require("./app");
dotenv.config();
const app = new app_1.default([]);
app.listen();
//# sourceMappingURL=server.js.map
