import { Router } from "express";
import { bmiController } from "../controllers/bmiController";
import { validateBmiInput } from "../middleware/validation.middleware";

const router = Router();

/**
 * BMI calculation endpoint
 * Supports both GET and POST methods:
 * - GET: with query parameters weight and height
 * - POST: with JSON body containing weight and height
 */
router
  .route("/bmi")
  .get(validateBmiInput, bmiController.calculateBmi)
  .post(validateBmiInput, bmiController.calculateBmi);

export { router as apiRouter };