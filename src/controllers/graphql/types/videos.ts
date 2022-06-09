import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Video } from './video';

@ObjectType()
export class Videos extends Paginated(Video) {}
