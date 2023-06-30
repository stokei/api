export interface BaseCronJob<TResponse = void> {
  execute: () => Promise<TResponse>;
}
