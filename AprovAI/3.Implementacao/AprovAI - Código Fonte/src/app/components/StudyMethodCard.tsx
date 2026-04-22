import { Edit, Trash2, Clock, Tag, Target } from 'lucide-react';
import { StudyMethod } from './StudyMethodForm';

interface StudyMethodCardProps {
  method: StudyMethod;
  onEdit: (method: StudyMethod) => void;
  onDelete: (id: string) => void;
}

const categoryLabels: Record<string, string> = {
  'tecnica-foco': 'Técnica de Foco',
  'organizacao': 'Organização',
  'memorizacao': 'Memorização',
  'revisao': 'Revisão',
  'criatividade': 'Criatividade'
};

const categoryColors: Record<string, string> = {
  'tecnica-foco': 'bg-blue-100 text-blue-800',
  'organizacao': 'bg-purple-100 text-purple-800',
  'memorizacao': 'bg-green-100 text-green-800',
  'revisao': 'bg-orange-100 text-orange-800',
  'criatividade': 'bg-pink-100 text-pink-800'
};

export function StudyMethodCard({ method, onEdit, onDelete }: StudyMethodCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">{method.name}</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors[method.category]}`}>
            {categoryLabels[method.category]}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(method)}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
            title="Editar"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(method.id)}
            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
            title="Excluir"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{method.description}</p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>Duração: {method.duration} minutos</span>
        </div>

        {method.benefits && method.benefits.length > 0 && (
          <div className="flex items-start gap-2 text-sm text-gray-700">
            <Tag className="w-4 h-4 text-gray-400 mt-0.5" />
            <div className="flex flex-wrap gap-1">
              {method.benefits.map((benefit, index) => (
                <span key={index} className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        )}

        {method.recommendedFor && (
          <div className="flex items-start gap-2 text-sm text-gray-700">
            <Target className="w-4 h-4 text-gray-400 mt-0.5" />
            <span>{method.recommendedFor}</span>
          </div>
        )}
      </div>
    </div>
  );
}
