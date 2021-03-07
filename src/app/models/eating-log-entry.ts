export interface EatingLogEntry {
  id: string;
  timestamp: number;
  time: Date;
  dishIds: string[];
  eatings: any[];
  totals: {
    proteins: number;
    fats: number;
    carbs: number;
    calories: number;
  };
}

