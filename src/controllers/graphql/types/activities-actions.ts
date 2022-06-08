import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { ActivitiesAction } from './activities-action';

@ObjectType()
export class ActivitiesActions extends Paginated(ActivitiesAction) {}
