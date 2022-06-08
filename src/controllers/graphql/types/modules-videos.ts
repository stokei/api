import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { ModulesVideo } from './modules-video';

@ObjectType()
export class ModulesVideos extends Paginated(ModulesVideo) {}
