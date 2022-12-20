
export enum SortByField {
  name,
  decription,
  websiteUrl,
  createdAt,
}
export type IBlog = Record<SortByField, string>;
