import { PageModel } from '@/models/page.model';

interface IDataPageUpdatedEvent {
  readonly updatedBy: string;
  readonly page: PageModel;
}

export class PageUpdatedEvent {
  readonly updatedBy: string;
  readonly page: PageModel;

  constructor(data: IDataPageUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.page = data.page;
  }
}
