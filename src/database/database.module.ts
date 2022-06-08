import { Module } from '@nestjs/common';
import { PrismaClient } from './prisma/client';

@Module({
  imports: [],
  providers: [PrismaClient],
  exports: [PrismaClient]
})
export class DatabaseModule {}
