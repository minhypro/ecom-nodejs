import mongoose from 'mongoose';
import os from 'os';
import process from 'process';
const _INTERVAL = 5000;

export const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(numConnections);
};

export const checkOverLoad = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnection = numCores * 5;

    console.log('Active connections::', numConnections);
    console.log('Memory usage(MB)::', memoryUsage / 1024 / 1024);

    if (numConnections > maxConnection) {
      console.log('Connection overload detected!');
      // notify.send...something
    }
  }, _INTERVAL);
};
