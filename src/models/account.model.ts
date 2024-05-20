import { ACCOUNT_DOCUMENT, ACCOUNT_COLLECTION } from '@/constants';
import { IAccount } from '@/interfaces';
import { model, Schema } from 'mongoose';

const accountSchema = new Schema<IAccount>(
  {
    name: {
      type: String,
      trim: true,
      maxLeng: 150,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: ACCOUNT_COLLECTION,
  },
);

export const accountModel = model(ACCOUNT_DOCUMENT, accountSchema);
