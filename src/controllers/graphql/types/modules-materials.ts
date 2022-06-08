import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { ModulesMaterial } from './modules-material';

@ObjectType()
export class ModulesMaterials extends Paginated(ModulesMaterial) {}
