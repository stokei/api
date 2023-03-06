import { PrismaClient } from '@prisma/client';

export class BaseSeeds {
  private prismaClient: PrismaClient;

  getPrismaClient() {
    return this.prismaClient;
  }

  setPrismaClient(client: PrismaClient) {
    this.prismaClient = client;
  }
}
