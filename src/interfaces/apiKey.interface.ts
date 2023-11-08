// import { Types } from 'mongoose';

export interface IApiKey {
  apiKey: string;
  isActivated: boolean;
  permissions: string[];
}
