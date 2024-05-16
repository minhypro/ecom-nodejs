import { ReasonStatusCode, StatusCode } from '@/constants';
import { Response } from 'express';

class SussessResponse {
  message: string;
  statusCode: number;
  metadata: any;

  constructor({ message, statusCode = StatusCode.OK, metadata = {} }) {
    this.message = message || ReasonStatusCode[statusCode];
    this.statusCode = statusCode;
    this.metadata = metadata;
  }

  send(res: Response) {
    return res.status(this.statusCode).json(this);
  }
}

export class OK extends SussessResponse {
  constructor({ message = ReasonStatusCode[StatusCode.OK], metadata }) {
    super({ message, metadata });
  }
}

export class CREATED extends SussessResponse {
  options: {};

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
