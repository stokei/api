import { AppAdminModel } from '@/models/app-admin.model';

interface IDataAppAdminRemovedEvent {
  readonly removedBy: string;
  readonly appAdmin: AppAdminModel;
}

export class AppAdminRemovedEvent {
  readonly removedBy: string;
  readonly appAdmin: AppAdminModel;

  constructor(data: IDataAppAdminRemovedEvent) {
    this.removedBy = data.removedBy;
    this.appAdmin = data.appAdmin;
  }
}
