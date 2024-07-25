import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";
import morgan from "morgan";
import compression from "compression";
import connectToDb from "./db/index.js";
import helmet from "helmet";
import cors from "cors";
// Split the environment variable into an array of allowed origins
app.use(
  cors({
    origin: process.env.EXPRESS_APP_APIURL, // Allow this origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// import session from "./session/index.js";
// import home from "./routes/home/index.js";
// import admin from "./routes/admin/index.js";
import api from "./routes/api/index.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const logFile = join(__dirname, "schoolcool.log");
const PORT = process.env.PORT || 3001;
app.use(helmet());
// Helmet with Content Security Policy settings
// app.use(
//   cors({
//     origin: process.env.EXPRESS_APP_APIURL,
//     credentials: true, // Allow this origin
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use(compression());

// Serve static files from the React app
// import path from "path";
// app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/api", (req, res) => {
  res.send({ message: "Hello from the server!" });
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

// app.use("/assets", express.static(join(__dirname, "public")));
// app.use(express.static(join(__dirname, "public", "client")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use("/admin", session(app));
app.use(morgan(":method - :url - :date - :response-time ms"));

// app.set("view engine", "pug");

// app.use("/admin", admin);
app.use("/api", api);
// app.use("/", home);

Promise.all([connectToDb()])
  .then(() =>
    app.listen(PORT, () =>
      console.log(`SchoolCool is connecting on port ${PORT}`)
    )
  )
  .catch((error) => {
    console.error(`MongoDB Atlas Error: ${error}`);
    process.exit();
  });

//Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
