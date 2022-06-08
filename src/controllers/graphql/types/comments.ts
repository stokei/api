import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { Comment } from './comment';

@ObjectType()
export class Comments extends Paginated(Comment) {}
