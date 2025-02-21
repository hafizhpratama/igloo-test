import { Request, Response, NextFunction } from "express";
import { bmiService } from "../services/bmiService";
import { BmiInput } from "../models/bmi.model";
import { HttpError } from "../utils/httpErrors";

export class BmiController {
  /**
   * Handle BMI calculation request
   * Supports both GET and POST methods
   */
  public calculateBmi(req: Request, res: Response, next: NextFunction): void {
    try {
      let input: BmiInput;

      // Get input parameters based on HTTP method
      if (req.method === "GET") {
        const { weight, height } = req.query;
        input = {
          weight: parseFloat(weight as string),
          height: parseFloat(height as string),
        };
      } else {
        // POST method
        input = req.body as BmiInput;
      }

      // Calculate BMI using the service
      const result = bmiService.calculateBmi(input);

      // Return the result
      res.status(200).json(result);
    } catch (error) {
      // Pass errors to the error handler
      if (error instanceof HttpError) {
        res.status(error.status).json({
          error: error.name,
          message: error.message,
          details: error.details,
        });
      } else {
        next(error);
      }
    }
  }
}

// Export as singleton
export const bmiController = new BmiController();