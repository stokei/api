import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Site } from './site';

@ObjectType()
export class Sites extends Paginated(Site) {}
