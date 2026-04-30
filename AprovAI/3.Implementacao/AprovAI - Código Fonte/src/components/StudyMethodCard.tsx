import { Clock, Tag, Edit2, Trash2, CheckCircle } from 'lucide-react';
import { getCategoryLabel, getCategoryColor } from '../utils/study-method.utils';
import type { StudyMethod } from '../types';

interface StudyMethodCardProps {
  method: StudyMethod;
  onEdit: (method: StudyMethod) => void;
  onDelete: (id: string) => void;
}

export function StudyMethodCard({ method, onEdit, onDelete }: StudyMethodCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{method.name}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(method.category)}`}>
              <Tag className="w-3 h-3" />
              {getCategoryLabel(method.category)}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              <Clock className="w-3 h-3" />
              {method.duration} min
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {method.description}
      </p>

      {method.benefits.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-700 mb-2">Benefícios:</p>
          <div className="space-y-1">
            {method.benefits.slice(0, 3).map((benefit, index) => (
              <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          <span className="font-medium">Recomendado para:</span> {method.recommendedFor}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(method)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <Edit2 className="w-4 h-4" />
          Editar
        </button>
        <button
          onClick={() => onDelete(method.id)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" />
          Excluir
        </button>
      </div>
    </div>
  );
}
