const { NODE_ENV, MONGO_URI, MONGO_PORT, MONGO_NAME } = process.env;

export const dbConfig = {
  HOST: MONGO_URI || 'localhost',
  PORT: MONGO_PORT || '27017',
  NAME: MONGO_NAME || 'shopDev',
};

export const environment = NODE_ENV || 'dev';
