import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { ClassroomsTag } from './classrooms-tag';

@ObjectType()
export class ClassroomsTags extends Paginated(ClassroomsTag) {}
