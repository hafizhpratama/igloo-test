/**
 * Integration tests for BMI API endpoints
 * 
 * Run with: npm test
 */

import request from "supertest";
import app from "../../index";

describe("BMI API", () => {
  describe("GET /api/bmi", () => {
    test("should return BMI calculation with valid parameters", async () => {
      const response = await request(app)
        .get("/api/bmi?weight=70&height=1.75")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toHaveProperty("bmi");
      expect(response.body).toHaveProperty("classification");
      expect(response.body.bmi).toBeCloseTo(22.9, 1);
      expect(response.body.classification).toBe("Normal weight");
    });

    test("should return 400 when weight is missing", async () => {
      const response = await request(app)
        .get("/api/bmi?height=1.75")
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toHaveProperty("error");
      expect(response.body).toHaveProperty("message");
      expect(response.body.error).toBe("Validation Error");
    });

    test("should return 400 when height is missing", async () => {
      const response = await request(app)
        .get("/api/bmi?weight=70")
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toHaveProperty("error");
      expect(response.body).toHaveProperty("message");
      expect(response.body.error).toBe("Validation Error");
    });

    test("should return 400 when parameters are invalid", async () => {
      const response = await request(app)
        .get("/api/bmi?weight=0&height=1.75")
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toHaveProperty("error");
      expect(response.body).toHaveProperty("message");
      expect(response.body.error).toBe("Validation Error");
    });
  });

  describe("POST /api/bmi", () => {
    test("should return BMI calculation with valid parameters", async () => {
      const response = await request(app)
        .post("/api/bmi")
        .send({ weight: 70, height: 1.75 })
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toHaveProperty("bmi");
      expect(response.body).toHaveProperty("classification");
      expect(response.body.bmi).toBeCloseTo(22.9, 1);
      expect(response.body.classification).toBe("Normal weight");
    });

    test("should return 400 when weight is missing", async () => {
      const response = await request(app)
        .post("/api/bmi")
        .send({ height: 1.75 })
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toHaveProperty("error");
      expect(response.body).toHaveProperty("message");
      expect(response.body.error).toBe("Validation Error");
    });

    test("should return 400 when height is missing", async () => {
      const response = await request(app)
        .post("/api/bmi")
        .send({ weight: 70 })
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toHaveProperty("error");
      expect(response.body).toHaveProperty("message");
      expect(response.body.error).toBe("Validation Error");
    });

    test("should return 400 when parameters are invalid", async () => {
      const response = await request(app)
        .post("/api/bmi")
        .send({ weight: -10, height: 1.75 })
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toHaveProperty("error");
      expect(response.body).toHaveProperty("message");
      expect(response.body.error).toBe("Validation Error");
    });
  });
});