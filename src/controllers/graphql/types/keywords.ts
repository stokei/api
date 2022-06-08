import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Keyword } from './keyword';

@ObjectType()
export class Keywords extends Paginated(Keyword) {}
