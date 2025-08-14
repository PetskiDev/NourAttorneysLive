export const tag = {
  peopleList: (): string => "people:list",
  person: (id: number | string): string => `person:${id}`,
  block: (relUrl: string): string => `block:${relUrl}`,
  expertiseList: (): string => "expertise:list",
  expertise: (id: number | string): string => `expertise:${id}`,
  serviceList: (): string => "service:list",
  serviceSlug: (slug: string): string => `service:slug:${slug}`,
  serviceId: (id: number | string): string => `service:id:${id}`,
  insightsList: (): string => "insight:list",
  insightSlug: (slug: string): string => `insight:slug:${slug}`,
  insightId: (id: number | string): string => `insight:id:${id}`,
  footerList: (): string => "footer:list",
  footerId: (id: number | string): string => `footer:id:${id}`,
  footerText: (): string => "footer:text",
  partnerList: (): string => "partner:list",
  partnerId: (id: number | string): string => `partner:id:${id}`,
  partnerSlug: (slug: string): string => `partner:slug:${slug}`,
};


