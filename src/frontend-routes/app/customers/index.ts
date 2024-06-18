const baseURL = '/customers';

export const routesCustomers = {
  home: baseURL + '/courses',
  products: baseURL + '/products',
  courses: baseURL + '/courses',
  materials: baseURL + '/materials',
  material: ({ material }: { material: string }) =>
    baseURL + '/materials/' + material,
  course: ({ course }: { course?: string }) => {
    const baseCourseURL = baseURL + '/courses/' + course;

    return {
      home: baseCourseURL,
      modules: baseCourseURL + '/modules',
      videos: baseCourseURL + '/videos',
      video: ({ video }: { video: string }) =>
        baseCourseURL + '/videos/' + video,
      materials: {
        home: baseCourseURL + '/materials',
        view: ({ material }: { material: string }) => {
          const baseMaterialURL = baseCourseURL + '/materials/' + material;
          return {
            home: baseMaterialURL
          };
        }
      }
    };
  },
  subscriptions: {
    home: baseURL + '/subscriptions',
    subscription: ({ subscription }: { subscription?: string }) =>
      baseURL + '/subscriptions/' + subscription
  },
  orders: {
    home: baseURL + '/orders',
    order: ({ order }: { order?: string }) => baseURL + '/orders/' + order
  },
  invoices: baseURL + '/invoices'
};
