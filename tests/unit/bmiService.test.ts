/**
 * Unit tests for BmiService
 * 
 * Run with: npm test
 */

import { BmiService } from "../../services/bmiService";
import { BadRequestError } from "../../utils/httpErrors";

describe("BmiService", () => {
  // Create a new instance of BmiService for testing
  const bmiService = new BmiService();

  describe("calculateBmi", () => {
    test("should calculate BMI correctly for normal weight", () => {
      const result = bmiService.calculateBmi({ weight: 70, height: 1.75 });
      expect(result.bmi).toBeCloseTo(22.9, 1);
      expect(result.classification).toBe("Normal weight");
    });

    test("should calculate BMI correctly for underweight", () => {
      const result = bmiService.calculateBmi({ weight: 50, height: 1.75 });
      expect(result.bmi).toBeCloseTo(16.3, 1);
      expect(result.classification).toBe("Underweight");
    });

    test("should calculate BMI correctly for overweight", () => {
      const result = bmiService.calculateBmi({ weight: 85, height: 1.75 });
      expect(result.bmi).toBeCloseTo(27.8, 1);
      expect(result.classification).toBe("Overweight");
    });

    test("should calculate BMI correctly for obesity class I", () => {
      const result = bmiService.calculateBmi({ weight: 100, height: 1.75 });
      expect(result.bmi).toBeCloseTo(32.7, 1);
      expect(result.classification).toBe("Obesity class I");
    });

    test("should calculate BMI correctly for obesity class II", () => {
      const result = bmiService.calculateBmi({ weight: 115, height: 1.75 });
      expect(result.bmi).toBeCloseTo(37.6, 1);
      expect(result.classification).toBe("Obesity class II");
    });

    test("should calculate BMI correctly for obesity class III", () => {
      const result = bmiService.calculateBmi({ weight: 130, height: 1.75 });
      expect(result.bmi).toBeCloseTo(42.4, 1);
      expect(result.classification).toBe("Obesity class III");
    });

    test("should throw BadRequestError for invalid input", () => {
      expect(() => {
        bmiService.calculateBmi({ weight: -10, height: 1.75 });
      }).toThrow(BadRequestError);

      expect(() => {
        bmiService.calculateBmi({ weight: 70, height: -1.75 });
      }).toThrow(BadRequestError);

      expect(() => {
        bmiService.calculateBmi({ weight: 0, height: 1.75 });
      }).toThrow(BadRequestError);

      expect(() => {
        bmiService.calculateBmi({ weight: 70, height: 0 });
      }).toThrow(BadRequestError);
    });
  });
});