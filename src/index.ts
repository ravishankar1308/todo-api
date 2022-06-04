import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./config/database";

import { UserRoute, TodoRoute } from "./routes";

connectDB();
const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
UserRoute(app);
TodoRoute(app);
// app.use(cookieParser());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response): void => {
  res.send("Spades TODO Api Running");
});

const server = app.listen(process.env.PORT, () =>
  console.log(`Server Connected to port ${process.env.PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err}`);
  server.close(() => process.exit(1));
});
