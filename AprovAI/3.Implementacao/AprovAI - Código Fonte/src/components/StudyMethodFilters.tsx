import { Search } from 'lucide-react';
import { getCategoryLabel } from '../utils/study-method.utils';
import type { StudyMethodFilters, StudyMethodCategory } from '../types';

interface StudyMethodFiltersProps {
  filters: StudyMethodFilters;
  onFiltersChange: (filters: StudyMethodFilters) => void;
}

const CATEGORIES: Array<StudyMethodCategory | 'all'> = [
  'all',
  'tecnica-foco',
  'organizacao',
  'memorizacao',
  'revisao',
  'criatividade'
];

export function StudyMethodFiltersComponent({ filters, onFiltersChange }: StudyMethodFiltersProps) {
  const handleSearchChange = (searchTerm: string) => {
    onFiltersChange({ ...filters, searchTerm });
  };

  const handleCategoryChange = (category: StudyMethodCategory | 'all') => {
    onFiltersChange({ ...filters, category });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar métodos..."
          value={filters.searchTerm || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <select
        value={filters.category || 'all'}
        onChange={(e) => handleCategoryChange(e.target.value as any)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {CATEGORIES.map(category => (
          <option key={category} value={category}>
            {category === 'all' ? 'Todas as categorias' : getCategoryLabel(category as StudyMethodCategory)}
          </option>
        ))}
      </select>
    </div>
  );
}
