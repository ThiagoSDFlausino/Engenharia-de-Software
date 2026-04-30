export type StudyMethodCategory =
  | 'tecnica-foco'
  | 'organizacao'
  | 'memorizacao'
  | 'revisao'
  | 'criatividade';

export interface StudyMethod {
  id: string;
  name: string;
  description: string;
  duration: number;
  category: StudyMethodCategory;
  benefits: string[];
  recommendedFor: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStudyMethodDTO {
  name: string;
  description: string;
  duration: number;
  category: StudyMethodCategory;
  benefits: string[];
  recommendedFor: string;
}

export interface UpdateStudyMethodDTO extends Partial<CreateStudyMethodDTO> {
  id: string;
}

export interface StudyMethodFilters {
  searchTerm?: string;
  category?: StudyMethodCategory | 'all';
}
