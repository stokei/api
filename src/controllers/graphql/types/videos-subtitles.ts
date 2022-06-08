import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { VideosSubtitle } from './videos-subtitle';

@ObjectType()
export class VideosSubtitles extends Paginated(VideosSubtitle) {}
