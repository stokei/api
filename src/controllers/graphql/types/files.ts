import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { File } from './file';

@ObjectType()
export class Files extends Paginated(File) {}
