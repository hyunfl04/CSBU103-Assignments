
export type AppView = 'calculator' | 'gallery';

export interface Photo {
  id: string;
  url: string;
  title: string;
  category: string;
  description: string;
}

export interface CalculatorState {
  display: string;
  prevValue: number | null;
  operation: string | null;
  waitingForOperand: boolean;
}
