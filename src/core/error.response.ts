import { ReasonStatusCode, StatusCode } from '@/constants';

export class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ConflictedError extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
    super(message, statusCode);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.BAD_REQUEST, statusCode = StatusCode.BAD_REQUEST) {
    super(message, statusCode);
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
    super(message, statusCode);
  }
}
