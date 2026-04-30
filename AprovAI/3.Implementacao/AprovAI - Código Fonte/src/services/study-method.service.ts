import type {
  StudyMethod,
  CreateStudyMethodDTO,
  UpdateStudyMethodDTO
} from '../types';

const STORAGE_KEY = 'study_methods';

const DEFAULT_METHODS: StudyMethod[] = [
  {
    id: '1',
    name: 'Técnica Pomodoro',
    description: 'Divide o tempo de estudo em blocos de 25 minutos com intervalos de 5 minutos. Após 4 blocos, faça uma pausa maior de 15-30 minutos.',
    duration: 25,
    category: 'tecnica-foco',
    benefits: ['Aumenta foco', 'Reduz procrastinação', 'Melhora produtividade'],
    recommendedFor: 'Estudantes com dificuldade de concentração prolongada',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Mapas Mentais',
    description: 'Organiza informações de forma visual usando diagramas hierárquicos com cores, imagens e palavras-chave conectadas.',
    duration: 45,
    category: 'organizacao',
    benefits: ['Facilita memorização', 'Estimula criatividade', 'Organiza ideias'],
    recommendedFor: 'Estudantes visuais e tópicos complexos',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Repetição Espaçada',
    description: 'Revisa o conteúdo em intervalos crescentes para transferir informações da memória de curto para longo prazo.',
    duration: 30,
    category: 'revisao',
    benefits: ['Memorização duradoura', 'Retenção eficiente', 'Combate esquecimento'],
    recommendedFor: 'Preparação para provas e concursos',
    createdAt: new Date().toISOString()
  }
];

class StudyMethodService {
  private async delay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getFromStorage(): StudyMethod[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        this.saveToStorage(DEFAULT_METHODS);
        return DEFAULT_METHODS;
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading from storage:', error);
      return DEFAULT_METHODS;
    }
  }

  private saveToStorage(methods: StudyMethod[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(methods));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  async getAll(): Promise<StudyMethod[]> {
    await this.delay();
    return this.getFromStorage();
  }

  async getById(id: string): Promise<StudyMethod | null> {
    await this.delay();
    const methods = this.getFromStorage();
    return methods.find(m => m.id === id) || null;
  }

  async create(data: CreateStudyMethodDTO): Promise<StudyMethod> {
    await this.delay();
    const methods = this.getFromStorage();

    const newMethod: StudyMethod = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedMethods = [...methods, newMethod];
    this.saveToStorage(updatedMethods);

    return newMethod;
  }

  async update(data: UpdateStudyMethodDTO): Promise<StudyMethod> {
    await this.delay();
    const methods = this.getFromStorage();

    const index = methods.findIndex(m => m.id === data.id);
    if (index === -1) {
      throw new Error('Método não encontrado');
    }

    const updatedMethod: StudyMethod = {
      ...methods[index],
      ...data,
      updatedAt: new Date().toISOString()
    };

    methods[index] = updatedMethod;
    this.saveToStorage(methods);

    return updatedMethod;
  }

  async delete(id: string): Promise<void> {
    await this.delay();
    const methods = this.getFromStorage();
    const filteredMethods = methods.filter(m => m.id !== id);
    this.saveToStorage(filteredMethods);
  }

  async search(query: string): Promise<StudyMethod[]> {
    await this.delay();
    const methods = this.getFromStorage();
    const lowerQuery = query.toLowerCase();

    return methods.filter(method =>
      method.name.toLowerCase().includes(lowerQuery) ||
      method.description.toLowerCase().includes(lowerQuery) ||
      method.benefits.some(b => b.toLowerCase().includes(lowerQuery))
    );
  }
}

export const studyMethodService = new StudyMethodService();
