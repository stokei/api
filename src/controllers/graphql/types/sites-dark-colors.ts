import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { SitesDarkColor } from './sites-dark-color';

@ObjectType()
export class SitesDarkColors extends Paginated(SitesDarkColor) {}
