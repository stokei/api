import { ICommand } from '@nestjs/cqrs';
import { CreateVideosTagDTO } from '@/dtos/videos-tags/create-videos-tag.dto';

export class CreateVideosTagCommand implements ICommand, CreateVideosTagDTO {
  name: string;
  parent: string;

  constructor(data: CreateVideosTagDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
