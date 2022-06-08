import { ICommand } from '@nestjs/cqrs';
import { CreateVideoDTO } from '@/dtos/videos/create-video.dto';

export class CreateVideoCommand implements ICommand, CreateVideoDTO {
  name: string;
  parent: string;

  constructor(data: CreateVideoDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
