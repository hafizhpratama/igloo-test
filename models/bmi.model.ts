export interface BmiInput {
    weight: number; // in kilograms
    height: number; // in meters
  }
  
  export interface BmiResult {
    bmi: number;
    classification: string;
  }
  
  export type BmiClassification = 
    | "Underweight"
    | "Normal weight"
    | "Overweight"
    | "Obesity class I"
    | "Obesity class II"
    | "Obesity class III";
  
  export interface ErrorResponse {
    error: string;
    message: string;
    details?: Record<string, unknown>;
  }