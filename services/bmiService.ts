import { BmiInput, BmiResult, BmiClassification } from "../models/bmi.model";
import { BadRequestError } from "../utils/httpErrors";

export class BmiService {
  /**
   * Calculate BMI based on weight and height
   * Formula: BMI = weight / (height)^2
   * @param input The weight and height input
   * @returns The calculated BMI and its classification
   */
  public calculateBmi(input: BmiInput): BmiResult {
    const { weight, height } = input;

    // Additional validation (should be redundant but included for safety)
    if (!weight || !height || weight <= 0 || height <= 0) {
      throw new BadRequestError("Invalid weight or height parameters");
    }

    // Calculate BMI
    const bmi = weight / (height * height);
    
    // Round to 1 decimal place
    const roundedBmi = Math.round(bmi * 10) / 10;
    
    return {
      bmi: roundedBmi,
      classification: this.getBmiClassification(roundedBmi)
    };
  }

  /**
   * Get BMI classification based on the calculated BMI value
   * Using WHO international classification
   * @param bmi The calculated BMI value
   * @returns The BMI classification
   */
  private getBmiClassification(bmi: number): BmiClassification {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      return "Normal weight";
    } else if (bmi >= 25 && bmi < 30) {
      return "Overweight";
    } else if (bmi >= 30 && bmi < 35) {
      return "Obesity class I";
    } else if (bmi >= 35 && bmi < 40) {
      return "Obesity class II";
    } else {
      return "Obesity class III";
    }
  }
}

// Export as singleton
export const bmiService = new BmiService();