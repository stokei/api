import { AggregateRoot } from '@nestjs/cqrs';
import {
  cleanValue,
  convertToISODateString,
  createServiceId
} from '@stokei/nestjs';
import { Exclude } from 'class-transformer';

import { AccountRole } from '@/enums/account-role.enum';
import { AccountStatus } from '@/enums/account-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { AccountCreatedEvent } from '@/events/implements/accounts/account-created.event';
import { AccountRemovedEvent } from '@/events/implements/accounts/account-removed.event';
import { AccountUpdatedEvent } from '@/events/implements/accounts/account-updated.event';
import { PasswordChangedEvent } from '@/events/implements/accounts/password-changed.event';
import { PasswordForgottenEvent } from '@/events/implements/accounts/password-forgotten.event';

export interface IAccountModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly parent: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly lastPassword?: string;
  readonly salt: string;
  readonly avatar?: string;
  readonly active: boolean;
  readonly forgotPasswordCode?: string;
  readonly dateBirthday?: Date | string;
  readonly status: AccountStatus;
  readonly canceledAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  readonly roles: AccountRole[];
}

export class AccountModel extends AggregateRoot {
  readonly id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly fullname: string;
  readonly parent: string;
  readonly email: string;
  readonly username: string;
  @Exclude()
  readonly password: string;
  @Exclude()
  readonly lastPassword?: string;
  @Exclude()
  readonly salt: string;

  readonly avatar?: string;
  @Exclude()
  readonly forgotPasswordCode?: string;
  readonly dateBirthday?: string;
  readonly status: AccountStatus;
  readonly active: boolean;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  readonly roles: AccountRole[];
  constructor(data: IAccountModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ACCOUNTS,
      module: ServerStokeiApiIdPrefix.ACCOUNTS,
      id: data._id?.toString() || data.id
    });
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.fullname = cleanValue(`${data.firstname} ${data.lastname}`);
    this.parent = data.parent;
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.lastPassword = data.lastPassword;
    this.salt = data.salt;
    this.avatar = data.avatar;
    this.forgotPasswordCode = data.forgotPasswordCode;
    this.dateBirthday = convertToISODateString(data.dateBirthday);
    this.status = data.status || AccountStatus.ACTIVE;
    this.active = this.status === AccountStatus.ACTIVE || data.active;
    this.canceledAt = convertToISODateString(data.canceledAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
    this.roles = data.roles;
  }

  createdAccount() {
    if (this.id) {
      this.apply(
        new AccountCreatedEvent({
          account: this
        })
      );
    }
  }

  updatedAccount() {
    if (this.id) {
      this.apply(
        new AccountUpdatedEvent({
          account: this
        })
      );
    }
  }

  removedAccount() {
    if (this.id) {
      this.apply(
        new AccountRemovedEvent({
          account: this
        })
      );
    }
  }

  changedPassword() {
    if (this.id && this.email) {
      this.apply(
        new PasswordChangedEvent({
          account: this
        })
      );
    }
  }

  forgottenPassword() {
    if (this.id && this.email) {
      this.apply(
        new PasswordForgottenEvent({
          account: this
        })
      );
    }
  }
}
