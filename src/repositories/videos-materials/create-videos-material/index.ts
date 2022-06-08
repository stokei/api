import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { VideosMaterialMapper } from '@/mappers/videos-materials';
import { CreateVideosMaterialDTO } from '@/dtos/videos-materials/create-videos-material.dto';
import { VideosMaterialModel } from '@/models/videos-material.model';

@Injectable()
export class CreateVideosMaterialRepository
  implements
    IBaseRepository<CreateVideosMaterialDTO, Promise<VideosMaterialModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateVideosMaterialDTO): Promise<VideosMaterialModel> {
    return new VideosMaterialMapper().toModel(
      await this.model.videosMaterial.create({ data })
    );
  }
}
