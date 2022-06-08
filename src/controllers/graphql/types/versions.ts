import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Version } from './version';

@ObjectType()
export class Versions extends Paginated(Version) {}
