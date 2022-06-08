import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { VideoMapper } from '@/mappers/videos';
import { CreateVideoDTO } from '@/dtos/videos/create-video.dto';
import { VideoModel } from '@/models/video.model';

@Injectable()
export class CreateVideoRepository
  implements IBaseRepository<CreateVideoDTO, Promise<VideoModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateVideoDTO): Promise<VideoModel> {
    return new VideoMapper().toModel(await this.model.video.create({ data }));
  }
}
