import { KEY_TOKEN_COLLECTION, KEY_TOKEN_DOCUMENT, SHOP_DOCUMENT } from '@/constants';
import { IKeyToken } from '@/interfaces';
import { model, Schema } from 'mongoose';

const keyTokenSchema = new Schema<IKeyToken>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: SHOP_DOCUMENT,
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: KEY_TOKEN_COLLECTION,
  },
);

export const keyTokenModel = model(KEY_TOKEN_DOCUMENT, keyTokenSchema);
