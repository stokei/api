import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { CoursesStudent } from './courses-student';

@ObjectType()
export class CoursesStudents extends Paginated(CoursesStudent) {}
