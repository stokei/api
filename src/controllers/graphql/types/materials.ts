import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Material } from './material';

@ObjectType()
export class Materials extends Paginated(Material) {}
