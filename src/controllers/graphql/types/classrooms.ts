import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Classroom } from './classroom';

@ObjectType()
export class Classrooms extends Paginated(Classroom) {}
