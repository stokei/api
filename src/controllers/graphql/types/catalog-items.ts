import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { CatalogItem } from './catalog-item';

@ObjectType()
export class CatalogItems extends Paginated(CatalogItem) {}
