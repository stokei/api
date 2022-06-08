import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Language } from './language';

@ObjectType()
export class Languages extends Paginated(Language) {}
