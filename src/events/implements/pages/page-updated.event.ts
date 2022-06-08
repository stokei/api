import { PageModel } from '@/models/page.model';

interface IDataPageUpdatedEvent {
  readonly page: PageModel;
}

export class PageUpdatedEvent {
  readonly page: PageModel;

  constructor(data: IDataPageUpdatedEvent) {
    this.page = data.page;
  }
}
