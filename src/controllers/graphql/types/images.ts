import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Image } from './image';

@ObjectType()
export class Images extends Paginated(Image) {}
