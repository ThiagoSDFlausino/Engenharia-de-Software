import { useState } from 'react';
import { Plus, BookOpen, Search } from 'lucide-react';
import { StudyMethodForm, StudyMethod } from './components/StudyMethodForm';
import { StudyMethodCard } from './components/StudyMethodCard';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

export default function App() {
  const [methods, setMethods] = useState<StudyMethod[]>([
    {
      id: '1',
      name: 'Técnica Pomodoro',
      description: 'Divide o tempo de estudo em blocos de 25 minutos com intervalos de 5 minutos. Após 4 blocos, faça uma pausa maior de 15-30 minutos.',
      duration: 25,
      category: 'tecnica-foco',
      benefits: ['Aumenta foco', 'Reduz procrastinação', 'Melhora produtividade'],
      recommendedFor: 'Estudantes com dificuldade de concentração prolongada'
    },
    {
      id: '2',
      name: 'Mapas Mentais',
      description: 'Organiza informações de forma visual usando diagramas hierárquicos com cores, imagens e palavras-chave conectadas.',
      duration: 45,
      category: 'organizacao',
      benefits: ['Facilita memorização', 'Estimula criatividade', 'Organiza ideias'],
      recommendedFor: 'Estudantes visuais e tópicos complexos'
    },
    {
      id: '3',
      name: 'Repetição Espaçada',
      description: 'Revisa o conteúdo em intervalos crescentes para transferir informações da memória de curto para longo prazo.',
      duration: 30,
      category: 'revisao',
      benefits: ['Memorização duradoura', 'Retenção eficiente', 'Combate esquecimento'],
      recommendedFor: 'Preparação para provas e concursos'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<StudyMethod | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const handleSubmit = (data: Omit<StudyMethod, 'id'>) => {
    if (editingMethod) {
      setMethods(methods.map(m => m.id === editingMethod.id ? { ...data, id: editingMethod.id } : m));
      toast.success('Método atualizado com sucesso!');
    } else {
      const newMethod = { ...data, id: Date.now().toString() };
      setMethods([...methods, newMethod]);
      toast.success('Método cadastrado com sucesso!');
    }
    setShowForm(false);
    setEditingMethod(undefined);
  };

  const handleEdit = (method: StudyMethod) => {
    setEditingMethod(method);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este método?')) {
      setMethods(methods.filter(m => m.id !== id));
      toast.success('Método excluído com sucesso!');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMethod(undefined);
  };

  const filteredMethods = methods.filter(method => {
    const matchesSearch = method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         method.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || method.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
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
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Novo Método
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar métodos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas as categorias</option>
            <option value="tecnica-foco">Técnica de Foco</option>
            <option value="organizacao">Organização</option>
            <option value="memorizacao">Memorização</option>
            <option value="revisao">Revisão</option>
            <option value="criatividade">Criatividade</option>
          </select>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          {filteredMethods.length} {filteredMethods.length === 1 ? 'método encontrado' : 'métodos encontrados'}
        </div>

        {filteredMethods.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum método encontrado</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterCategory !== 'all'
                ? 'Tente ajustar os filtros de busca'
                : 'Comece cadastrando seu primeiro método de estudo'}
            </p>
            {!searchTerm && filterCategory === 'all' && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Cadastrar Método
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMethods.map(method => (
              <StudyMethodCard
                key={method.id}
                method={method}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <StudyMethodForm
          method={editingMethod}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <Toaster />
    </div>
  );
}