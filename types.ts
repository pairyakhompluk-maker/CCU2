
export type AssessmentType = 'NRS' | 'FACES' | 'CPOT' | 'DYSPNEA';

export interface AssessmentResult {
  id: string;
  patientSessionId?: string; // To track same patient across multiple assessments
  type: AssessmentType;
  score: number;
  timestamp: Date;
  details?: any;
  managementId?: string;
  customManagementText?: string;
  musicGenre?: string;
  satisfactionScore?: number; // 1-5 scale
}

export interface CPOTScore {
  facialExpression: number;
  bodyMovements: number;
  muscleTension: number;
  compliance: number;
}

export type ManagementCategory = 'PHARMACO' | 'NON_PHARMACO';

export interface ManagementOption {
  id: string;
  category: ManagementCategory;
  title: string;
  description: string;
  icon: React.ReactNode;
}
