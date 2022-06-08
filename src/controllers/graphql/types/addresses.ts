import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Address } from './address';

@ObjectType()
export class Addresses extends Paginated(Address) {}
