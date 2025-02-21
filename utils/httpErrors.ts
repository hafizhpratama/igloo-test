export class HttpError extends Error {
    status: number;
    details?: Record<string, unknown>;
  
    constructor(message: string, status: number, details?: Record<string, unknown>) {
      super(message);
      this.name = this.constructor.name;
      this.status = status;
      this.details = details;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class BadRequestError extends HttpError {
    constructor(message = "Bad Request", details?: Record<string, unknown>) {
      super(message, 400, details);
    }
  }
  
  export class NotFoundError extends HttpError {
    constructor(message = "Not Found", details?: Record<string, unknown>) {
      super(message, 404, details);
    }
  }
  
  export class InternalServerError extends HttpError {
    constructor(message = "Internal Server Error", details?: Record<string, unknown>) {
      super(message, 500, details);
    }
  }