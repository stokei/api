import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { FilesLoader } from '@/controllers/graphql/dataloaders/files.loader';
import { File } from '@/controllers/graphql/types/file';
import { Video } from '@/controllers/graphql/types/video';
import { VideoModel } from '@/models/video.model';

@Resolver(() => Video)
export class VideoFileResolver {
  constructor(private readonly filesLoader: FilesLoader) {}

  @ResolveField(() => File, { nullable: true })
  file(@Parent() video: VideoModel) {
    return video.file && this.filesLoader.findByIds.load(video.file);
  }
}
