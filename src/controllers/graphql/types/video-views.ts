import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { VideoView } from './video-view';

@ObjectType()
export class VideoViews extends Paginated(VideoView) {}
