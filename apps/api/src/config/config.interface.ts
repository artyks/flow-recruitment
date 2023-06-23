type ConfigServer = {
  PORT: number;
  HOST: string;
  GLOBAL_PREFIX: string;
};

type Config = {
  MODE: 'development' | 'production';
  SERVER: ConfigServer;
};

export type { Config, ConfigServer };
