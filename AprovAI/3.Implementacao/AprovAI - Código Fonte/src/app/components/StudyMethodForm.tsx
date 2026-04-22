import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

export interface StudyMethod {
  id: string;
  name: string;
  description: string;
  duration: number;
  category: string;
  benefits: string[];
  recommendedFor: string;
}

interface StudyMethodFormProps {
  method?: StudyMethod;
  onSubmit: (data: Omit<StudyMethod, 'id'>) => void;
  onCancel: () => void;
}

export function StudyMethodForm({ method, onSubmit, onCancel }: StudyMethodFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: method || {
      name: '',
      description: '',
      duration: 25,
      category: 'tecnica-foco',
      benefits: [],
      recommendedFor: ''
    }
  });

  const onFormSubmit = (data: any) => {
    const benefits = data.benefits.split(',').map((b: string) => b.trim()).filter(Boolean);
    onSubmit({ ...data, benefits });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {method ? 'Editar Método de Estudo' : 'Novo Método de Estudo'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Método *
            </label>
            <input
              {...register('name', { required: 'Nome é obrigatório' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Técnica Pomodoro"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria *
            </label>
            <select
              {...register('category', { required: 'Categoria é obrigatória' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="tecnica-foco">Técnica de Foco</option>
              <option value="organizacao">Organização</option>
              <option value="memorizacao">Memorização</option>
              <option value="revisao">Revisão</option>
              <option value="criatividade">Criatividade</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duração Sugerida (minutos) *
            </label>
            <input
              type="number"
              {...register('duration', {
                required: 'Duração é obrigatória',
                min: { value: 1, message: 'Duração mínima é 1 minuto' }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="25"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição *
            </label>
            <textarea
              {...register('description', { required: 'Descrição é obrigatória' })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descreva como funciona este método de estudo..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Benefícios (separados por vírgula)
            </label>
            <input
              {...register('benefits')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Aumenta foco, Reduz procrastinação, Melhora produtividade"
              defaultValue={method?.benefits?.join(', ') || ''}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recomendado Para
            </label>
            <input
              {...register('recommendedFor')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Estudantes com dificuldade de concentração"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {method ? 'Atualizar' : 'Cadastrar'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
