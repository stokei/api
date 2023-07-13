import { IS_DEVELOPMENT } from '@/environments';

export const getDefaultAppDomain = ({ appId }: { appId: string }): string => {
  if (IS_DEVELOPMENT) {
    return `localhost:3001/app/${appId}`;
  }
  return `${appId}.stokei.app`;
};
