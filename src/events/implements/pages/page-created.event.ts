import { PageModel } from '@/models/page.model';

interface IDataPageCreatedEvent {
  readonly createdBy: string;
  readonly page: PageModel;
}

export class PageCreatedEvent {
  readonly createdBy: string;
  readonly page: PageModel;

  constructor(data: IDataPageCreatedEvent) {
    this.createdBy = data.createdBy;
    this.page = data.page;
  }
}
