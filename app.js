const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const errorHandler = require("./middlewares/errorHandler.js");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

// CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static assets (optional if you have a public folder)
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/v1", require("./routes/index.js"));

// Serve React build
app.use(express.static(path.join(__dirname, "dist")));

// React Router fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Error handlers
app.use(errorHandler.errorHandler404);
app.use(errorHandler.errorHandler);

module.exports = app;
