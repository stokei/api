import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { ClassroomsModule } from './classrooms-module';

@ObjectType()
export class ClassroomsModules extends Paginated(ClassroomsModule) {}
