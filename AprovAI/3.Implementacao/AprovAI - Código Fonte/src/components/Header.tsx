import { BookOpen, Plus } from 'lucide-react';

interface HeaderProps {
  onCreateNew: () => void;
}

export function Header({ onCreateNew }: HeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Métodos de Estudo</h1>
              <p className="text-sm text-gray-600">Gerencie os métodos disponíveis no sistema</p>
            </div>
          </div>
          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Novo Método
          </button>
        </div>
      </div>
    </div>
  );
}
