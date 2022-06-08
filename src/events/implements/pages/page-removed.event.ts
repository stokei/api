import { PageModel } from '@/models/page.model';

interface IDataPageRemovedEvent {
  readonly page: PageModel;
}

export class PageRemovedEvent {
  readonly page: PageModel;

  constructor(data: IDataPageRemovedEvent) {
    this.page = data.page;
  }
}
