import { ImagesControllers } from './images';
import { VideosControllers } from './videos';

export const RestControllers = [...ImagesControllers, ...VideosControllers];
