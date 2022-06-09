import { Resolver, ResolveReference } from '@nestjs/graphql';

import { VideosSubtitlesLoader } from '@/controllers/graphql/dataloaders/videos-subtitles.loader';
import { VideosSubtitle } from '@/controllers/graphql/types/videos-subtitle';

@Resolver(() => VideosSubtitle)
export class VideosSubtitleReferenceResolver {
  constructor(private readonly videosSubtitlesLoader: VideosSubtitlesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.videosSubtitlesLoader.findByIds.load(reference.id);
  }
}
