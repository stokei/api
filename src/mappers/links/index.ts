import { ILinkModelData, LinkModel } from '@/models/link.model';

export class LinkMapper {
  toModel(link: ILinkModelData) {
    return link && new LinkModel(link);
  }
  toModels(links: ILinkModelData[]) {
    return links?.length > 0 ? links.map(this.toModel).filter(Boolean) : [];
  }
}
