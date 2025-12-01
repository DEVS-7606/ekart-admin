export interface ICategory {
  code: string;
  name: string;
  parentCode?: string;
  level: number;
  isActive: boolean;
  description?: string;
}
