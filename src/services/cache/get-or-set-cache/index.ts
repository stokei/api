import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class GetOrSetCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async execute<TResponse = any>(
    key: string,
    setter: () => Promise<TResponse>,
    expiresIn?: number
  ): Promise<TResponse> {
    // let value: TResponse = await this.cacheManager.get(key);
    // if (!value && setter) {
    //   const time = expiresIn >= 0 ? expiresIn : 60 * 1000;
    //   value = await setter?.();
    //   await this.cacheManager.set(key, value, time);
    // }
    // return value;
    return await setter?.();
  }
}
