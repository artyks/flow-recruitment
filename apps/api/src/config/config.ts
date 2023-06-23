import { Config } from './config.interface';

const loadConfig = (): Config => {
  if (!process.env.BE_PORT) {
    throw new Error("Provide 'BE_PORT' env variable");
  }
  if (!process.env.BE_HOST) {
    throw new Error("Provide 'BE_HOST' env variable");
  }
  if (!process.env.BE_GLOBAL_PREFIX) {
    throw new Error("Provide 'BE_GLOBAL_PREFIX' env variable");
  }
  if (!process.env.NODE_ENV || (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'production')) {
    throw new Error(`Provide a correct 'NODE_ENV' env variable. Received: '${process.env.NODE_ENV}'`);
  }

  return {
    MODE: process.env.NODE_ENV,
    SERVER: {
      PORT: parseInt(process.env.BE_PORT, 10),
      HOST: process.env.BE_HOST,
      GLOBAL_PREFIX: process.env.BE_GLOBAL_PREFIX,
    },
  };
};

export { loadConfig };
