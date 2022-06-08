import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Rating } from './rating';

@ObjectType()
export class Ratings extends Paginated(Rating) {}
