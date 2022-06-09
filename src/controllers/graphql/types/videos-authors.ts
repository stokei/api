import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { VideosAuthor } from './videos-author';

@ObjectType()
export class VideosAuthors extends Paginated(VideosAuthor) {}
