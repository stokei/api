import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Catalog } from './catalog';

@ObjectType()
export class Catalogs extends Paginated(Catalog) {}
