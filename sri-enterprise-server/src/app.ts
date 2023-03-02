import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import createError from "http-errors";

import { errorHandler } from "./errorHandler";
import vendorRouter from "./routes/vendor.router";
import userRouter from "./routes/user.router";

const nodeEnvironment: string = process.env.NODE_ENV
  ? process.env.NODE_ENV.trim()
  : "development";

dotenv.config({
  path: `./environment/.env.${nodeEnvironment}`,
});

const port: string = process.env.PORT ?? "5000";

var app: express.Application = express();
app.listen(port, () => {
  console.log(
    `Server is up and running on ${
      isNaN(parseInt(port)) ? "PIPE => " + port : "PORT => " + port
    } with Process ID PID=>${process.pid}`
  );
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use("/api", router);
app.use("/vendor", vendorRouter);
app.use("/user", userRouter);

app.use(
  "*",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const err = createError({ message: "path not Found", code: 404 });
    next(err);
  }
);

app.use(errorHandler);


export default app