import { PageModel } from '@/models/page.model';

interface IDataPageRemovedEvent {
  readonly removedBy: string;
  readonly page: PageModel;
}

export class PageRemovedEvent {
  readonly removedBy: string;
  readonly page: PageModel;

  constructor(data: IDataPageRemovedEvent) {
    this.removedBy = data.removedBy;
    this.page = data.page;
  }
}
