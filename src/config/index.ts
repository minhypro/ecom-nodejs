const { NODE_ENV, MONGO_URI, MONGO_PORT, MONGO_NAME } = process.env;

const dev = {
  app: {
    port: 3001,
  },
  db: {
    HOST: MONGO_URI || 'localhost',
    PORT: MONGO_PORT || '27017',
    NAME: MONGO_NAME || 'shopDev',
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET,
  },
};

const pro = {
  app: {
    port: 3000,
  },
  db: {
    HOST: MONGO_URI || 'localhost',
    PORT: MONGO_PORT || '27017',
    NAME: MONGO_NAME || 'shopPro',
  },
};

export const environment = NODE_ENV || 'pro';
export const isDevEnv = environment === 'dev';

const config = { dev, pro };

export default config[environment] as typeof dev;
