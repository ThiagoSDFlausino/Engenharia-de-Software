# Arquitetura do Projeto - Métodos de Estudo

## 📁 Estrutura de Pastas

```
src/
├── app/                          # Aplicação principal
│   ├── components/ui/            # Componentes UI (shadcn/ui)
│   └── App.tsx                   # Componente raiz
├── components/                   # Componentes de negócio
│   ├── Header.tsx               # Cabeçalho da aplicação
│   ├── StudyMethodCard.tsx      # Card de exibição
│   ├── StudyMethodForm.tsx      # Formulário CRUD
│   ├── StudyMethodFilters.tsx   # Filtros e busca
│   └── StudyMethodList.tsx      # Lista com estados
├── hooks/                        # Custom Hooks
│   ├── useStudyMethods.ts       # Hook principal (CRUD + Estado)
│   ├── useStudyMethodForm.ts    # Hook do formulário
│   └── index.ts                 # Exports
├── services/                     # Camada de Serviços (Backend)
│   └── study-method.service.ts  # Service com API calls
├── types/                        # TypeScript Types
│   ├── study-method.ts          # Interfaces e tipos
│   └── index.ts                 # Exports
└── utils/                        # Utilitários
    └── study-method.utils.ts    # Helpers e constantes
```

## 🏗️ Camadas da Arquitetura

### 1. **Types Layer** (`/types`)
- Define contratos e interfaces
- Garante type-safety em todo o app
- Facilita refatoração

**Principais tipos:**
- `StudyMethod`: Interface principal
- `CreateStudyMethodDTO`: Dados para criação
- `UpdateStudyMethodDTO`: Dados para atualização
- `StudyMethodFilters`: Filtros de busca

### 2. **Services Layer** (`/services`)
- **Responsabilidade única**: Comunicação com backend
- Atualmente usa `localStorage` (mock)
- **Preparado para migração para Supabase**
- Simula latência de rede para UX realista

**API pública:**
```typescript
- getAll(): Promise<StudyMethod[]>
- getById(id): Promise<StudyMethod | null>
- create(data): Promise<StudyMethod>
- update(data): Promise<StudyMethod>
- delete(id): Promise<void>
- search(query): Promise<StudyMethod[]>
```

### 3. **Hooks Layer** (`/hooks`)
- Gerencia estado da aplicação
- Conecta UI com Services
- Encapsula lógica de negócio

**`useStudyMethods`:**
- Estado global dos métodos
- CRUD operations
- Filtros em tempo real
- Loading e error states

**`useStudyMethodForm`:**
- Estado do formulário
- Validações
- Submit handler

### 4. **Components Layer** (`/components`)
- Componentes reutilizáveis e isolados
- Recebem dados via props
- Sem lógica de negócio complexa

**Componentes principais:**
- `Header`: Cabeçalho e botão de criação
- `StudyMethodFilters`: Busca e filtros
- `StudyMethodList`: Grid com loading/empty states
- `StudyMethodCard`: Exibição individual
- `StudyMethodForm`: Modal de CRUD

### 5. **Utils Layer** (`/utils`)
- Funções puras e helpers
- Constantes e mappers
- Sem side effects

**Utilitários:**
- `filterStudyMethods()`: Lógica de filtro
- `formatDuration()`: Formatação de tempo
- `getCategoryLabel()`: Labels i18n
- `getCategoryColor()`: Mapeamento de cores

## 🔄 Fluxo de Dados

```
User Action (UI)
    ↓
Component Event Handler
    ↓
Hook Function (useStudyMethods)
    ↓
Service Method (studyMethodService)
    ↓
Backend/Storage (localStorage → Supabase)
    ↓
Service Response
    ↓
Hook State Update
    ↓
Component Re-render
```

## 🎯 Princípios de Clean Code Aplicados

### 1. **Separation of Concerns**
- Cada camada tem responsabilidade única
- UI separada de lógica de negócio
- Backend isolado em services

### 2. **Single Responsibility Principle**
- Cada arquivo/função faz uma coisa só
- Componentes pequenos e focados
- Hooks especializados

### 3. **Dependency Inversion**
- Components dependem de abstrações (hooks)
- Hooks dependem de services
- Services podem ser substituídos facilmente

### 4. **Type Safety**
- TypeScript em todo o projeto
- Interfaces bem definidas
- Zero `any` types

### 5. **Testability**
- Funções puras nos utils
- Services mockáveis
- Hooks isolados

## 🚀 Migração para Supabase

### Passos para integração:

1. **Conectar Supabase** (via Make settings)

2. **Criar tabela `study_methods`:**
```sql
CREATE TABLE study_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL,
  category TEXT NOT NULL,
  benefits TEXT[] NOT NULL,
  recommended_for TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

3. **Atualizar `study-method.service.ts`:**
   - Substituir localStorage por Supabase client
   - Manter mesma interface pública
   - Sem mudanças nos hooks ou componentes

4. **Benefícios:**
   - ✅ Persistência real
   - ✅ Sincronização entre dispositivos
   - ✅ Busca otimizada no servidor
   - ✅ Sem mudanças no frontend

## 📊 Estado da Aplicação

### Estado Local (Component):
- `showForm`: boolean
- `editingMethod`: StudyMethod | undefined

### Estado Global (Hook):
- `methods`: StudyMethod[]
- `filteredMethods`: StudyMethod[]
- `loading`: boolean
- `error`: string | null
- `filters`: StudyMethodFilters

## 🛠️ Manutenção

### Para adicionar novo campo:
1. Atualizar interface em `/types`
2. Atualizar service (CRUD)
3. Atualizar form component
4. Atualizar card component

### Para adicionar nova funcionalidade:
1. Criar hook se necessário
2. Criar componente
3. Integrar no App.tsx
4. Adicionar service method se precisar backend

### Para trocar backend:
1. Criar novo service (ex: `supabase.service.ts`)
2. Manter mesma interface
3. Atualizar import no hook
4. **Zero mudanças nos componentes**

## 📝 Convenções

- **Nomenclatura**: PascalCase para components, camelCase para functions
- **Arquivos**: kebab-case.tsx
- **Interfaces**: PascalCase com sufixo (DTO, Props, etc)
- **Async**: Sempre com try/catch e loading states
- **Validação**: No formulário + service
- **Mensagens**: Toast para feedback ao usuário
