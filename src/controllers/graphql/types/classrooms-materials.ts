import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { ClassroomsMaterial } from './classrooms-material';

@ObjectType()
export class ClassroomsMaterials extends Paginated(ClassroomsMaterial) {}
