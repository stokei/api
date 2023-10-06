import { IS_DEVELOPMENT } from '@/environments';

export const getDefaultSiteDomain = ({ slug }: { slug: string }): string => {
  if (IS_DEVELOPMENT) {
    return `localhost:3001/app/${slug}`;
  }
  return `${slug}.stokei.app`;
};
