import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { ClassroomsInstructor } from './classrooms-instructor';

@ObjectType()
export class ClassroomsInstructors extends Paginated(ClassroomsInstructor) {}
