import express from "express";
import ExpressError from "./expressError.js";
import bookRoutes from "./routes/books.js";

const app = express();

app.use(express.json()); // Parse body data

app.use("/books", bookRoutes);

/** 404 handler */
app.use((req, res, next) => {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err,
    message: err.message,
  });
});

export default app;
