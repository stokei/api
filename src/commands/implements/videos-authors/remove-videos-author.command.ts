import { ICommand } from '@nestjs/cqrs';
import {
  RemoveVideosAuthorDTO,
  RemoveVideosAuthorWhereDTO
} from '@/dtos/videos-authors/remove-videos-author.dto';

export class RemoveVideosAuthorCommand
  implements ICommand, RemoveVideosAuthorDTO
{
  where: RemoveVideosAuthorWhereDTO;
  constructor(data: RemoveVideosAuthorDTO) {
    this.where = data.where;
  }
}
