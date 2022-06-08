import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { VideosMaterial } from './videos-material';

@ObjectType()
export class VideosMaterials extends Paginated(VideosMaterial) {}
