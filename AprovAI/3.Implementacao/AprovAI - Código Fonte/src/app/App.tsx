import { useState } from 'react';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';
import { useStudyMethods } from '../hooks';
import { Header } from '../components/Header';
import { StudyMethodFiltersComponent } from '../components/StudyMethodFilters';
import { StudyMethodList } from '../components/StudyMethodList';
import { StudyMethodForm } from '../components/StudyMethodForm';
import type { StudyMethod, CreateStudyMethodDTO } from '../types';

export default function App() {
  const {
    filteredMethods,
    loading,
    error,
    filters,
    setFilters,
    createMethod,
    updateMethod,
    deleteMethod
  } = useStudyMethods();

  const [showForm, setShowForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<StudyMethod | undefined>();

  const handleCreateNew = () => {
    setEditingMethod(undefined);
    setShowForm(true);
  };

  const handleEdit = (method: StudyMethod) => {
    setEditingMethod(method);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este método?')) {
      return;
    }

    try {
      await deleteMethod(id);
      toast.success('Método excluído com sucesso!');
    } catch (err) {
      toast.error('Erro ao excluir método');
    }
  };

  const handleSubmit = async (data: CreateStudyMethodDTO) => {
    try {
      if (editingMethod) {
        await updateMethod({ ...data, id: editingMethod.id });
        toast.success('Método atualizado com sucesso!');
      } else {
        await createMethod(data);
        toast.success('Método cadastrado com sucesso!');
      }
      setShowForm(false);
      setEditingMethod(undefined);
    } catch (err) {
      toast.error(editingMethod ? 'Erro ao atualizar método' : 'Erro ao cadastrar método');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMethod(undefined);
  };

  const hasFilters = Boolean(filters.searchTerm) || filters.category !== 'all';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateNew={handleCreateNew} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <StudyMethodFiltersComponent filters={filters} onFiltersChange={setFilters} />

        <div className="my-6 text-sm text-gray-600">
          {!loading && (
            <>
              {filteredMethods.length} {filteredMethods.length === 1 ? 'método encontrado' : 'métodos encontrados'}
            </>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <StudyMethodList
          methods={filteredMethods}
          loading={loading}
          hasFilters={hasFilters}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreateNew={handleCreateNew}
        />
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
