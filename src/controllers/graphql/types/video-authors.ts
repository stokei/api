import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { VideoAuthor } from './video-author';

@ObjectType()
export class VideoAuthors extends Paginated(VideoAuthor) {}
