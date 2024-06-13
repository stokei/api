const baseURL = "/";

export const routesCustomPage = ({ slug }: { slug: string }) => {
  const baseRoute = baseURL + slug;
  return {
    home: baseRoute,
  };
};
