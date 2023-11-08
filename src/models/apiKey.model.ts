import { API_KEY_COLLECTION, API_KEY_DOCUMENT } from '@/constants';
import { IApiKey } from '@/interfaces';
import { model, Schema } from 'mongoose';

const apiKeySchema = new Schema<IApiKey>(
  {
    apiKey: {
      type: String,
      required: true,
    },
    isActivated: {
      type: Boolean,
      required: true,
    },
    permissions: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: API_KEY_COLLECTION,
  },
);

export const apiKeyModel = model(API_KEY_DOCUMENT, apiKeySchema);
