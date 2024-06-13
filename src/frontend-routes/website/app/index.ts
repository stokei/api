export const routesApp = (data: { appId?: string }) => {
  const baseURL = `/apps/${data?.appId}`;
  return {
    home: baseURL,
    financial: {
      home: baseURL + "/financial",
    },
    coupons: {
      home: baseURL + "/coupons",
    },
    subscriptions: {
      home: baseURL + "/subscriptions",
      add: baseURL + "/subscriptions/add",
      subscription: ({ subscription }: { subscription?: string }) =>
        baseURL + "/subscriptions/view/" + subscription,
    },
    catalog: ({ catalog }: { catalog?: string }) => {
      const baseCatalogURL = baseURL + "/catalogs/" + catalog;
      return {
        home: baseCatalogURL,
        products: baseCatalogURL + "/products",
      };
    },
    catalogs: {
      home: baseURL + "/catalogs",
      add: baseURL + "/catalogs/add",
    },
    onboardings: {
      home: baseURL + "/onboardings",
      pagarme: {
        home: baseURL + "/onboardings/pagarme",
        callback: baseURL + "/onboardings/pagarme/callback",
      },
    },
    courses: baseURL + "/courses",
    course: ({ course }: { course?: string }) => {
      const baseCourseURL = baseURL + "/course/" + (course || "");
      return {
        home: baseCourseURL,
        instructors: baseCourseURL + "/instructors",
        modules: {
          home: baseCourseURL + "/modules",
          addVideo: ({ module }: { module: string }) =>
            baseCourseURL + "/modules/" + module + "/videos/add",
          editVideo: ({ module, video }: { module: string; video: string }) =>
            baseCourseURL + "/modules/" + module + "/videos/" + video + "/edit",
        },
        students: baseCourseURL + "/students",
        settings: {
          home: baseCourseURL + "/settings",
        },
        material: ({ material }: { material: string }) => {
          const baseMaterialURL = baseCourseURL + "/materials/view/" + material;
          return {
            home: baseMaterialURL,
          };
        },
        materials: {
          home: baseCourseURL + "/materials",
          add: baseCourseURL + "/materials/add",
        },
      };
    },
    invoices: baseURL + "/invoices",
    member: ({ member }: { member?: string }) => {
      const baseMemberURL = baseURL + "/members/" + (member || "");
      return {
        home: baseMemberURL,
      };
    },
    members: baseURL + "/members",
    product: ({ product }: { product: string }) => {
      const baseProductURL = baseURL + "/products/" + product;
      return {
        home: baseProductURL,
        prices: baseProductURL + "/prices",
        features: baseProductURL + "/features",
      };
    },
    products: {
      home: baseURL + "/products",
      add: baseURL + "/products/add",
    },
    sites: {
      home: baseURL + "/sites",
      add: baseURL + "/sites/add",
    },
    site: ({ site }: { site: string }) => {
      const baseSiteURL = baseURL + "/sites/" + site;
      return {
        home: baseSiteURL + "/pages",
        pages: baseSiteURL + "/pages",
        domains: baseSiteURL + "/domains",
        metadata: baseSiteURL + "/metadata",
        page: ({ page, version }: { page: string; version?: string }) => {
          const basePageURL =
            baseSiteURL +
            "/pages/" +
            page +
            (version ? "?versionId=" + version : "");
          return {
            home: basePageURL,
          };
        },
      };
    },
    orders: {
      home: baseURL + "/orders",
      order: ({ order }: { order?: string }) => baseURL + "/orders/" + order,
    },
    payments: {
      home: baseURL + "/payments",
      payment: ({ payment }: { payment?: string }) =>
        baseURL + "/payments/" + payment,
    },
    material: ({ material }: { material: string }) => {
      const baseMaterialURL = baseURL + "/materials/view/" + material;
      return {
        home: baseMaterialURL,
      };
    },
    materials: {
      home: baseURL + "/materials",
      add: baseURL + "/materials/add",
    },
    settings: {
      home: baseURL + "/settings",
      billing: baseURL + "/settings/billing",
      colors: baseURL + "/settings/colors",
    },
  };
};
