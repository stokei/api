import { PageModel } from '@/models/page.model';

interface IDataPageCreatedEvent {
  readonly page: PageModel;
}

export class PageCreatedEvent {
  readonly page: PageModel;

  constructor(data: IDataPageCreatedEvent) {
    this.page = data.page;
  }
}
