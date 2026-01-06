export enum CalculatorType {
  SUBJECT_AVG = 'SUBJECT_AVG',
  YEARLY_AVG = 'YEARLY_AVG',
  SEMESTER_AVG = 'SEMESTER_AVG',
  TARGET_SCORE = 'TARGET_SCORE',
}

export interface ScoreInput {
  id: string;
  value: string;
  coefficient: number;
}

export interface CalculationResult {
  score: number | null;
  message: string;
  details?: string;
}

export interface FormulaInfo {
  title: string;
  formula: string;
  explanation: string;
  tips: string[];
}