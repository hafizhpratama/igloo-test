import express from "express";
import { apiRouter } from "./routes/api.routes";

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRouter);

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "BMI Calculator API",
    endpoints: {
      bmi: "/api/bmi"
    },
    documentation: "See README.md for detailed information"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", message: "The requested resource does not exist" });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong on the server"
  });
});

// Start the server
app.listen(port, () => {
  console.log(`BMI Calculator API listening on port ${port}`);
});

export default app;