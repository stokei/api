import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { ClassroomModule } from './classroom-module';

@ObjectType()
export class ClassroomModules extends Paginated(ClassroomModule) {}
