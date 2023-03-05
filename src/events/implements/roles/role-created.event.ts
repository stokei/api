import { RoleModel } from '@/models/role.model';

interface IDataRoleCreatedEvent {
  readonly createdBy: string;
  readonly role: RoleModel;
}

export class RoleCreatedEvent {
  readonly createdBy: string;
  readonly role: RoleModel;

  constructor(data: IDataRoleCreatedEvent) {
    this.createdBy = data.createdBy;
    this.role = data.role;
  }
}
