import { AppAdminModel } from '@/models/app-admin.model';

interface IDataAppAdminCreatedEvent {
  readonly createdBy: string;
  readonly appAdmin: AppAdminModel;
}

export class AppAdminCreatedEvent {
  readonly createdBy: string;
  readonly appAdmin: AppAdminModel;

  constructor(data: IDataAppAdminCreatedEvent) {
    this.createdBy = data.createdBy;
    this.appAdmin = data.appAdmin;
  }
}
