import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Answer } from './answer';

@ObjectType()
export class Answers extends Paginated(Answer) {}
