// Call in installed dependencies
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import mainRoutes from "./server/routes/main.js";
import * as dotenv from "dotenv";
import rateLimitMiddleware from "./server/middlewares/rateLimiter.js";

// Dotenv config
dotenv.config();

// set up express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

var whitelist = [
  "http://localhost:3000",
  "http://namthanh-wedding.website",
  "https://namthanh-wedding.website",
  "https://wedding-fe-eight.vercel.app",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
app.use(rateLimitMiddleware);

// set up mongoose
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log("e", e);
    console.log("Error connecting to database");
  });

// set up home route
app.get("/", (request, respond) => {
  respond.status(200).json({
    message: "Welcome to Project Support",
  });
});

app.listen(process.env.PORT, (request, respond) => {
  console.log(`Server is live on ${process.env.PORT}. Yay!`);
});

// set up route
app.use("/api/", mainRoutes);
