export type ColType = 'number' | 'text' | 'date';

export interface ColDef {
  field: string;
  header: string;
  type?: ColType;
}
