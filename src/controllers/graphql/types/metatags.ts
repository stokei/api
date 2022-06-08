import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Metatag } from './metatag';

@ObjectType()
export class Metatags extends Paginated(Metatag) {}
