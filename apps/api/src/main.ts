import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Config } from './config/config.interface';
import { AppModule } from './app.module';
import { mockUserOnReq } from '@flow-recruitment/common/middlewares';

const bootstrap = async () => {
  /**
   * Create NestJs application
   */
  const app = await NestFactory.create(AppModule);

  /**
   * Retrieve config envs
   */
  const configService: ConfigService<Config, true> = app.get(ConfigService);
  const { HOST, PORT, GLOBAL_PREFIX } = configService.get('SERVER', { infer: true });

  /**
   * Apply global settings
   */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.setGlobalPrefix(GLOBAL_PREFIX);

  /**
   * Apply mock-user-onto-request middleware
   * TODO: for showcase only; remove it later
   */
  app.use(mockUserOnReq);

  /**
   * Initialise NestJs lifecycle events
   */
  await app.init();

  /**
   * Start HTTP server
   */
  await app.listen(PORT, HOST);
  Logger.log(`🚀 API is running on: ${HOST}:${PORT}/${GLOBAL_PREFIX}`);
};

bootstrap();
