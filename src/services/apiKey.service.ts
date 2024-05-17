import { PermissionEnum } from '@/enums/permission.enum';
import { IApiKey } from '@/interfaces';
import { apiKeyModel } from '@/models';
import crypto from 'node:crypto';

export class ApiKeyService {
  static findById = async (key: string): Promise<IApiKey> => {
    try {
      const apiKey = await apiKeyModel
        .findOne({ apiKey: key, isActivated: true })
        .lean();
      return apiKey;
    } catch (error) {
      return error;
    }
  };

  static generate = async (): Promise<IApiKey> => {
    try {
      const key = crypto.randomBytes(64).toString('hex');
      const apiKey = await apiKeyModel.create({
        apiKey: key,
        isActivated: true,
        permissions: [PermissionEnum.READ],
      });

      return apiKey;
    } catch (error) {
      return error;
    }
  };
}
