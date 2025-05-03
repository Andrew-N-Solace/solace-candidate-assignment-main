// src/lib/errors.ts
export class ApiError extends Error {
  constructor(message: string, public status = 500) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class MethodNotAllowedError extends ApiError {
  constructor(message = "Method Not Allowed") {
    super(message, 405);
  }
}
