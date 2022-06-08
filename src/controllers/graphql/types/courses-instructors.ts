import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { CoursesInstructor } from './courses-instructor';

@ObjectType()
export class CoursesInstructors extends Paginated(CoursesInstructor) {}
