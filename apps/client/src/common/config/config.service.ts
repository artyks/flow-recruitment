import { Config } from './config.type';

class ConfigServicePrivate {
  get() {
    if (!process.env.VUE_APP_BE_PROTOCOL) {
      throw new Error("Provide 'BE_PROTOCOL' env variable");
    }
    if (!process.env.VUE_APP_BE_HOST) {
      throw new Error("Provide 'BE_HOST' env variable");
    }
    if (!process.env.VUE_APP_BE_PORT) {
      throw new Error("Provide 'BE_PORT' env variable");
    }
    if (!process.env.VUE_APP_BE_GLOBAL_PREFIX) {
      throw new Error("Provide 'BE_GLOBAL_PREFIX' env variable");
    }

    return {
      BE_SERVER: {
        PROTOCOL: process.env.VUE_APP_BE_PROTOCOL,
        HOST: process.env.VUE_APP_BE_HOST,
        PORT: parseInt(process.env.VUE_APP_BE_PORT, 10),
        GLOBAL_PREFIX: process.env.VUE_APP_BE_GLOBAL_PREFIX,
      },
    } satisfies Config;
  }
}

const service = new ConfigServicePrivate();

export { service as ConfigService };
