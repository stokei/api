import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { SitesLightColor } from './sites-light-color';

@ObjectType()
export class SitesLightColors extends Paginated(SitesLightColor) {}
