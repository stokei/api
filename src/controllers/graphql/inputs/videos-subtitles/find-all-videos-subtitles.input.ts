import {
  OrderByDataFindAllVideosSubtitlesDTO,
  WhereDataFindAllVideosSubtitlesDTO
} from '@/dtos/videos-subtitles/find-all-videos-subtitles.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllVideosSubtitlesDataInput
  implements WhereDataFindAllVideosSubtitlesDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllVideosSubtitlesInput
  implements OrderByDataFindAllVideosSubtitlesDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllVideosSubtitlesInput extends WherePaginated(
  WhereDataFindAllVideosSubtitlesDataInput
) {}
