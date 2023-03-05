import { RoleModel } from '@/models/role.model';

interface IDataRoleRemovedEvent {
  readonly removedBy: string;
  readonly role: RoleModel;
}

export class RoleRemovedEvent {
  readonly removedBy: string;
  readonly role: RoleModel;

  constructor(data: IDataRoleRemovedEvent) {
    this.removedBy = data.removedBy;
    this.role = data.role;
  }
}
