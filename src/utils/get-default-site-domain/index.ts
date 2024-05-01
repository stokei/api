import { IS_DEVELOPMENT } from '@/environments';

export const getDefaultSiteDomain = ({ slug }: { slug: string }): string => {
  if (IS_DEVELOPMENT) {
    return `localhost:3001/site/${slug}`;
  }
  return `${slug}.stokei.app`;
};
