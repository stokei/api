const baseURL = '/products';

export const routesProduct = {
  home: ({ product, price }: { product: string; price?: string }) =>
    `${baseURL}/${product}${price ? '?price=' + price : ''}`
};
