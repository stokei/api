import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { ClassroomsPlan } from './classrooms-plan';

@ObjectType()
export class ClassroomsPlans extends Paginated(ClassroomsPlan) {}
