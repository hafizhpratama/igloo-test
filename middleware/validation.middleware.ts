import { Request, Response, NextFunction } from "express";
import { BmiInput } from "../models/bmi.model";

/**
 * Middleware to validate BMI input parameters
 */
export const validateBmiInput = (req: Request, res: Response, next: NextFunction): void => {
  const method = req.method;
  let input: Partial<BmiInput> = {};

  // Get input parameters based on HTTP method
  if (method === "GET") {
    const { weight, height } = req.query;
    input = {
      weight: weight ? parseFloat(weight as string) : undefined,
      height: height ? parseFloat(height as string) : undefined,
    };
  } else if (method === "POST") {
    input = req.body;
  }

  // Validate parameters
  const errors: string[] = [];

  // Check if weight is provided and valid
  if (input.weight === undefined || input.weight === null) {
    errors.push("Weight is required");
  } else if (isNaN(input.weight)) {
    errors.push("Weight must be a number");
  } else if (input.weight <= 0) {
    errors.push("Weight must be greater than zero");
  }

  // Check if height is provided and valid
  if (input.height === undefined || input.height === null) {
    errors.push("Height is required");
  } else if (isNaN(input.height)) {
    errors.push("Height must be a number");
  } else if (input.height <= 0) {
    errors.push("Height must be greater than zero");
  }

  // If there are validation errors, return a 400 Bad Request response
  if (errors.length > 0) {
    res.status(400).json({
      error: "Validation Error",
      message: "Invalid input parameters",
      details: { errors },
    });
    return;
  }

  // If validation passes, continue to the next middleware/controller
  next();
};