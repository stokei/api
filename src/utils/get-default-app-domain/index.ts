import { IS_DEVELOPMENT } from '@/environments';

export const getDefaultAppDomain = ({ appId }: { appId: string }): string => {
  if (IS_DEVELOPMENT) {
    return `http://localhost:3001/app/${appId}`;
  }
  return `https://${appId}.stokei.app`;
};
