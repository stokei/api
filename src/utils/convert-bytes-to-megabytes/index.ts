export const convertBytesToMegabytes = (bytes: number): number =>
  Math.floor(bytes / (1024 * 1024));
