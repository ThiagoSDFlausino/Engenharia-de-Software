import { BookOpen, Plus } from 'lucide-react';
import { StudyMethodCard } from './StudyMethodCard';
import type { StudyMethod } from '../types';

interface StudyMethodListProps {
  methods: StudyMethod[];
  loading: boolean;
  hasFilters: boolean;
  onEdit: (method: StudyMethod) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}

export function StudyMethodList({
  methods,
  loading,
  hasFilters,
  onEdit,
  onDelete,
  onCreateNew
}: StudyMethodListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (methods.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum método encontrado</h3>
        <p className="text-gray-600 mb-4">
          {hasFilters
            ? 'Tente ajustar os filtros de busca'
            : 'Comece cadastrando seu primeiro método de estudo'}
        </p>
        {!hasFilters && (
          <button
            onClick={onCreateNew}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Cadastrar Método
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {methods.map(method => (
        <StudyMethodCard
          key={method.id}
          method={method}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
