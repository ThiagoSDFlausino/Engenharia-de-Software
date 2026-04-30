import { useState, useEffect, useCallback } from 'react';
import { studyMethodService } from '../services/study-method.service';
import { filterStudyMethods } from '../utils/study-method.utils';
import type {
  StudyMethod,
  CreateStudyMethodDTO,
  UpdateStudyMethodDTO,
  StudyMethodFilters
} from '../types';

interface UseStudyMethodsReturn {
  methods: StudyMethod[];
  filteredMethods: StudyMethod[];
  loading: boolean;
  error: string | null;
  filters: StudyMethodFilters;
  setFilters: (filters: StudyMethodFilters) => void;
  createMethod: (data: CreateStudyMethodDTO) => Promise<StudyMethod>;
  updateMethod: (data: UpdateStudyMethodDTO) => Promise<StudyMethod>;
  deleteMethod: (id: string) => Promise<void>;
  refreshMethods: () => Promise<void>;
}

export function useStudyMethods(): UseStudyMethodsReturn {
  const [methods, setMethods] = useState<StudyMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<StudyMethodFilters>({
    searchTerm: '',
    category: 'all'
  });

  const loadMethods = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studyMethodService.getAll();
      setMethods(data);
    } catch (err) {
      setError('Erro ao carregar métodos de estudo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMethods();
  }, [loadMethods]);

  const createMethod = useCallback(async (data: CreateStudyMethodDTO): Promise<StudyMethod> => {
    try {
      setError(null);
      const newMethod = await studyMethodService.create(data);
      setMethods(prev => [...prev, newMethod]);
      return newMethod;
    } catch (err) {
      const message = 'Erro ao criar método';
      setError(message);
      throw new Error(message);
    }
  }, []);

  const updateMethod = useCallback(async (data: UpdateStudyMethodDTO): Promise<StudyMethod> => {
    try {
      setError(null);
      const updatedMethod = await studyMethodService.update(data);
      setMethods(prev => prev.map(m => m.id === data.id ? updatedMethod : m));
      return updatedMethod;
    } catch (err) {
      const message = 'Erro ao atualizar método';
      setError(message);
      throw new Error(message);
    }
  }, []);

  const deleteMethod = useCallback(async (id: string): Promise<void> => {
    try {
      setError(null);
      await studyMethodService.delete(id);
      setMethods(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      const message = 'Erro ao excluir método';
      setError(message);
      throw new Error(message);
    }
  }, []);

  const filteredMethods = filterStudyMethods(methods, filters);

  return {
    methods,
    filteredMethods,
    loading,
    error,
    filters,
    setFilters,
    createMethod,
    updateMethod,
    deleteMethod,
    refreshMethods: loadMethods
  };
}
