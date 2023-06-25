import { Module, Global } from '@nestjs/common';
import { PrismaClientService } from './prisma.client';

@Global()
@Module({
  providers: [PrismaClientService],
  exports: [PrismaClientService],
})
class PrismaModule {}

export { PrismaModule };
