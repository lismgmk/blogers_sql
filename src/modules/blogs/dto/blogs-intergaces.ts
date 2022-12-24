
export enum SortByField {
  name,
  description,
  websiteUrl,
  createdAt,
}
export type IBlog = Record<SortByField, string>;
