import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import router from "./routes/Routes.js";
import passport from "passport";
import dotenv from "dotenv";
import { passportConfig } from "./config/passport.js";

const app = express();
dotenv.config();

const allowedOrigins = [process.env.CLIENT_URL]; // E.g., http://localhost:3000

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Enable credentials (cookies, authentication)
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

app.use("/auth", router);

app.listen(5000, () => console.log("Server running on port 5000"));
