import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Domain } from './domain';

@ObjectType()
export class Domains extends Paginated(Domain) {}
