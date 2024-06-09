import { ReasonStatusCode, StatusCode } from '@/constants';
import { Response } from 'express';

class SussessResponse {
  message: string;
  status: number;
  metadata: unknown;

  constructor({ message, statusCode = StatusCode.OK, metadata = {} }) {
    this.message = message || ReasonStatusCode[statusCode];
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res: Response) {
    return res.status(this.status).json(this);
  }
}

export class OK extends SussessResponse {
  constructor({ message = ReasonStatusCode[StatusCode.OK], metadata }) {
    super({ message, metadata });
  }
}

export class CREATED extends SussessResponse {
  options: object;

  constructor({
    options = {},
    message = ReasonStatusCode[StatusCode.CREATED],
    statusCode = StatusCode.CREATED,
    metadata,
  }) {
    super({ message, metadata, statusCode });
    this.options = options;
  }
}
