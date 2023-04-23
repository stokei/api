import { AppResolver } from './app';
import { AppsResolver } from './apps';
import { CurrentAppResolver } from './current-app';

export const AppsQueries = [AppResolver, AppsResolver, CurrentAppResolver];
