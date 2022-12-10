import path from 'path';

export const PATHNAME_FILES = 'files';
export const PATHNAME_IMAGES = 'images';
export const PATHNAME_VIDEOS = 'videos';
const BASE_PATH = path.resolve(__dirname, '..', '..', 'tmp');
export const PATH_FILES = path.resolve(BASE_PATH, PATHNAME_FILES);
