import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { VideosTag } from './videos-tag';

@ObjectType()
export class VideosTags extends Paginated(VideosTag) {}
