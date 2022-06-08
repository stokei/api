import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Currency } from './currency';

@ObjectType()
export class Currencies extends Paginated(Currency) {}
