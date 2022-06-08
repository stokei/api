import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Plan } from './plan';

@ObjectType()
export class Plans extends Paginated(Plan) {}
