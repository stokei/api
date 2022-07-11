import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { ModuleVideo } from './module-video';

@ObjectType()
export class ModuleVideos extends Paginated(ModuleVideo) {}
