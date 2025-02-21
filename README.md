# BMI Calculator API

A RESTful API for calculating Body Mass Index (BMI) based on user-provided weight and height.

## Overview

This API provides an endpoint that calculates a person's BMI using the standard formula:

```
BMI = weight / (height)²
```

The API also classifies the calculated BMI according to the World Health Organization's international classification:

- Underweight: BMI < 18.5
- Normal weight: 18.5 ≤ BMI < 25
- Overweight: 25 ≤ BMI < 30
- Obesity class I: 30 ≤ BMI < 35
- Obesity class II: 35 ≤ BMI < 40
- Obesity class III: BMI ≥ 40

## Architecture and Design

This application follows a clean architecture pattern with layers of responsibility:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain the business logic for BMI calculation and classification
- **Models**: Define the data structures used throughout the application
- **Middleware**: Provide request validation and error handling
- **Routes**: Define the API endpoints and their corresponding controllers

### Design Decisions

1. **HTTP Methods**:
   - Both `GET` and `POST` methods are supported for the BMI endpoint
   - `GET` is convenient for simple browser requests and testing
   - `POST` is more appropriate for sending data to the server and follows REST principles for resource creation

2. **Input Validation**:
   - Middleware is used to validate requests before they reach the controller
   - Both weight and height must be provided and must be positive numbers
   - Detailed error messages are returned for invalid inputs

3. **Error Handling**:
   - Custom error classes extend the standard Error class
   - HTTP-specific errors with appropriate status codes
   - Consistent error response structure across the API

4. **Code Quality**:
   - Written in TypeScript for type safety
   - Follows SOLID principles
   - Comprehensive test coverage

## API Endpoints

### Calculate BMI

#### `GET /api/bmi`

Calculate BMI using query parameters.

**Query Parameters**:
- `weight`: Weight in kilograms (required, must be > 0)
- `height`: Height in meters (required, must be > 0)

**Example Request**:
```
GET /api/bmi?weight=70&height=1.75
```

**Example Response** (200 OK):
```json
{
  "bmi": 22.9,
  "classification": "Normal weight"
}
```

#### `POST /api/bmi`

Calculate BMI using a JSON payload.

**Request Body**:
```json
{
  "weight": 70,
  "height": 1.75
}
```

**Example Response** (200 OK):
```json
{
  "bmi": 22.9,
  "classification": "Normal weight"
}
```

### Error Responses

**Bad Request** (400):
```json
{
  "error": "Validation Error",
  "message": "Invalid input parameters",
  "details": {
    "errors": ["Weight must be greater than zero"]
  }
}
```

**Not Found** (404):
```json
{
  "error": "Not Found",
  "message": "The requested resource does not exist"
}
```

**Internal Server Error** (500):
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong on the server"
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bmi-calculator-api.git
cd bmi-calculator-api
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

The API will be available at `http://localhost:3000`.

### Development

For development with automatic restarts:
```bash
npm run dev
```

### Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

### Linting

Run ESLint:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

## Deployment

### Docker

You can build and run the application using Docker:

1. Build the Docker image:
```bash
docker build -t bmi-calculator-api .
```

2. Run the container:
```bash
docker run -p 3000:3000 bmi-calculator-api
```

### Cloud Deployment

The application can be deployed to various cloud platforms:

#### Heroku

1. Create a Heroku app:
```bash
heroku create
```

2. Push to Heroku:
```bash
git push heroku main
```

#### AWS Elastic Beanstalk

1. Initialize EB CLI:
```bash
eb init
```

2. Create an environment:
```bash
eb create
```

3. Deploy:
```bash
eb deploy
```

## API Testing

You can test the API using tools like cURL, Postman, or simply your browser for GET requests.

### cURL Examples

**GET request**:
```bash
curl -X GET "http://localhost:3000/api/bmi?weight=70&height=1.75"
```

**POST request**:
```bash
curl -X POST "http://localhost:3000/api/bmi" \
     -H "Content-Type: application/json" \
     -d '{"weight": 70, "height": 1.75}'
```

## License

MIT

## Author

Principal Software Engineer