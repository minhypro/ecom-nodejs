import { IApiKey } from '@/interfaces';
import { apiKeyModel } from '@/models';

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
}
