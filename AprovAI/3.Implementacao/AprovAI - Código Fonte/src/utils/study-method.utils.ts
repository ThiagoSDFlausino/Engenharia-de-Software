import type { StudyMethod, StudyMethodFilters, StudyMethodCategory } from '../types';

export const CATEGORY_LABELS: Record<StudyMethodCategory, string> = {
  'tecnica-foco': 'Técnica de Foco',
  'organizacao': 'Organização',
  'memorizacao': 'Memorização',
  'revisao': 'Revisão',
  'criatividade': 'Criatividade'
};

export const CATEGORY_COLORS: Record<StudyMethodCategory, string> = {
  'tecnica-foco': 'bg-purple-100 text-purple-700',
  'organizacao': 'bg-blue-100 text-blue-700',
  'memorizacao': 'bg-green-100 text-green-700',
  'revisao': 'bg-orange-100 text-orange-700',
  'criatividade': 'bg-pink-100 text-pink-700'
};

export function filterStudyMethods(
  methods: StudyMethod[],
  filters: StudyMethodFilters
): StudyMethod[] {
  return methods.filter(method => {
    const matchesSearch = !filters.searchTerm ||
      method.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      method.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesCategory = !filters.category ||
      filters.category === 'all' ||
      method.category === filters.category;

    return matchesSearch && matchesCategory;
  });
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}min`;
}

export function getCategoryLabel(category: StudyMethodCategory): string {
  return CATEGORY_LABELS[category] || category;
}

export function getCategoryColor(category: StudyMethodCategory): string {
  return CATEGORY_COLORS[category] || 'bg-gray-100 text-gray-700';
}
