import { SHOP_COLLECTION, SHOP_DOCUMENT } from '@/constants';
import { IShop } from '@/interfaces';
import { model, Schema } from 'mongoose';

const shopSchema = new Schema<IShop>(
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
    collection: SHOP_COLLECTION,
  },
);

export const shopModel = model(SHOP_DOCUMENT, shopSchema);
