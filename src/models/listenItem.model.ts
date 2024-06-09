import { LISTEN_ITEM_DOCUMENT, LISTEN_ITEM_COLLECTION } from '@/constants';
import { IListenItem } from '@/interfaces';
import { model, Schema } from 'mongoose';

const keyTokenSchema = new Schema<IListenItem>(
  {
    uri: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: LISTEN_ITEM_COLLECTION,
  },
);

export const listenItemModel = model(LISTEN_ITEM_DOCUMENT, keyTokenSchema);
