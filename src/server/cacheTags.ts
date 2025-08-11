export const tag = {
  peopleList: (): string => "people:list",
  person: (id: number | string): string => `person:${id}`,
  block: (relUrl: string): string => `block:${relUrl}`,
  expertiseList: (): string => "expertise:list",
  expertise: (id: number | string): string => `expertise:${id}`,
  serviceList: (): string => "service:list",
  serviceSlug: (slug: string): string => `service:slug:${slug}`,
  serviceId: (id: number | string): string => `service:id:${id}`,
};


