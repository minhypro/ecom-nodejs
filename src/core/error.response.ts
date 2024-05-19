import { ReasonStatusCode, StatusCode } from '@/constants';

export class ErrorResponse extends Error {
  status: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;
  }
}

export class ConflictedError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode[StatusCode.CONFLICT],
    statusCode = StatusCode.CONFLICT,
  ) {
    super(message, statusCode);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode[StatusCode.BAD_REQUEST],
    statusCode = StatusCode.BAD_REQUEST,
  ) {
    super(message, statusCode);
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode[StatusCode.FORBIDDEN],
    statusCode = StatusCode.FORBIDDEN,
  ) {
    super(message, statusCode);
  }
}

export class AuthorizeFailed extends ErrorResponse {
  constructor(
    message = ReasonStatusCode[StatusCode.UNAUTHORIZED],
    statusCode = StatusCode.UNAUTHORIZED,
  ) {
    super(message, statusCode);
  }
}
