import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Price } from './price';

@ObjectType()
export class Prices extends Paginated(Price) {}
