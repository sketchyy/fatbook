export type ColType = 'number' | 'text' | 'date' | 'title';

export interface ColDef {
  field: string;
  header: string;
  type?: ColType;
}
