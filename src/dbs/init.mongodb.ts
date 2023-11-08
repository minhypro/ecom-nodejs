import mongoose from 'mongoose';
import { dbConfig, environment } from '@config';

const { HOST, PORT, NAME } = dbConfig;
const connectString = `mongodb://${HOST}:${PORT}/${NAME}`;

class Database {
  static instance: Database;
  constructor() {
    this.connect();
  }

  connect = async (type = 'mongodb') => {
    switch (type) {
      case 'mongodb':
        break;

      default:
        break;
    }
    if (environment === 'dev') {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    try {
      const conn = await mongoose.connect(connectString);
      console.log('MongoDB connected: ' + conn.connection.name);
    } catch (err) {
      console.log('Error ' + err.message);
      process.exit(1);
    }
  };
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export const instanceMongodb = Database.getInstance();
