# 🎫 RaspaGreen - Plataforma de Raspadinhas Digitais

Uma aplicação moderna de raspadinhas digitais construída com Vue 3, TypeScript e Vite, seguindo as melhores práticas de desenvolvimento.

## ✨ Características

### 🎯 **Core Features**
- 🎲 Sistema de raspadinhas digitais (em desenvolvimento)
- 📦 Inventário de itens com busca e filtros
- 💰 Sistema de transações e carteira digital
- 🎁 Sistema de indicações (referrals)
- 👤 Autenticação e gerenciamento de usuário
- 📱 Design responsivo e acessível

### 🏗️ **Arquitetura Técnica**
- **Vue 3** com Composition API e `<script setup>`
- **TypeScript** para tipagem estática
- **Pinia** para gerenciamento de estado
- **Vue Router** para navegação
- **Vite** como bundler e dev server
- **Vitest** para testes unitários

### 🎨 **Design System**
- Design fiel ao Figma
- Variáveis CSS customizadas
- Componentes reutilizáveis
- Mobile-first approach
- Suporte a temas escuros
- Acessibilidade (WCAG)

## 📁 Estrutura do Projeto

```
src/
├── assets/           # Recursos estáticos (CSS, imagens)
├── components/       # Componentes Vue reutilizáveis
├── composables/      # Lógica reutilizável (Composition API)
├── config/          # Configurações da aplicação
├── constants/       # Constantes e configurações
├── router/          # Configuração do Vue Router
├── services/        # Camada de API e serviços externos
├── stores/          # Stores do Pinia
├── tests/           # Testes unitários
├── types/           # Definições TypeScript
├── utils/           # Funções utilitárias
├── views/           # Páginas/Views da aplicação
├── App.vue          # Componente raiz
└── main.ts          # Ponto de entrada
```

## 🚀 Começando

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd raspadinha

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento
npm run build            # Build para produção
npm run preview          # Preview do build de produção

# Qualidade de Código
npm run type-check       # Verificação de tipos TypeScript
npm run lint             # Linting com ESLint
npm run format           # Formatação com Prettier

# Testes
npm run test             # Executa testes unitários
npm run test:coverage    # Testes com cobertura
npm run test:ui          # Interface visual dos testes
```

## 🏛️ Arquitetura

### **State Management (Pinia)**
- `authStore` - Autenticação e dados do usuário
- `inventoryStore` - Gerenciamento do inventário
- `dashboardStore` - Dados do dashboard e transações
- `financialStore` - Operações financeiras

### **Routing (Vue Router)**
- `/` - Página inicial
- `/inventario` - Inventário de itens
- `/raspadinhas` - Raspadinhas (em breve)
- `/indicacoes` - Sistema de referrals
- `/transacoes` - Histórico de transações
- `/login` e `/registro` - Autenticação

### **API Layer**
- `apiClient` - Cliente HTTP configurado
- Serviços específicos por domínio
- Interceptores para autenticação
- Tratamento de erros centralizado
- Suporte a mock data para desenvolvimento

### **Composables**
- `useApi` - Operações HTTP reativas
- `useValidation` - Validação de formulários
- `useFormatter` - Formatação de dados
- `useDebounce` - Debounce para inputs
- `useLocalStorage` - Persistência local
- `useImageLoader` - Carregamento de imagens

## 🎨 Sistema de Design

### **Variáveis CSS**
```css
--primary-color: #26E702      /* Verde principal */
--background-color: #181818   /* Fundo escuro */
--text-color: #fafafa         /* Texto claro */
--box-border: #383838         /* Bordas */
```

### **Breakpoints Responsivos**
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`
- Large: `> 1440px`

### **Componentes**
- `AppHeader` - Cabeçalho com navegação
- `AppFooter` - Rodapé
- `InventorySection` - Grade de itens
- `SummarySection` - Cards de resumo
- `WelcomeSection` - Seção de boas-vindas

## 🧪 Testes

### **Estrutura de Testes**
```
src/tests/
├── setup.ts              # Configuração global
├── utils.test.ts          # Testes de utilitários
├── composables.test.ts    # Testes de composables
└── stores.test.ts         # Testes de stores
```

### **Executar Testes**
```bash
npm run test              # Todos os testes
npm run test:coverage     # Com cobertura
npm run test:ui           # Interface visual
```

## 🔧 Configuração

### **Variáveis de Ambiente**
Crie um arquivo `.env` baseado em `.env.example`:

```env
# API
VITE_API_BASE_URL=http://localhost:3000/api

# Features
VITE_ENABLE_MOCK_API=true
VITE_ENABLE_DEV_TOOLS=true

# External Services
VITE_GOOGLE_ANALYTICS_ID=
VITE_SENTRY_DSN=
```

### **TypeScript**
- Configuração estrita habilitada
- Paths configurados (`@/` → `src/`)
- Tipos personalizados em `src/types/`

## 📱 Features

### **✅ Implementado**
- [x] Autenticação com JWT
- [x] Inventário com busca e filtros
- [x] Sistema de transações
- [x] Dashboard responsivo
- [x] Gerenciamento de estado com Pinia
- [x] Roteamento com Vue Router
- [x] Validação de formulários
- [x] Loading states e tratamento de erros
- [x] Testes unitários básicos
- [x] Design responsivo

### **🚧 Em Desenvolvimento**
- [ ] Sistema de raspadinhas digitais
- [ ] Integração com APIs reais
- [ ] Sistema de pagamentos
- [ ] Notificações push
- [ ] PWA (Progressive Web App)

### **🔮 Planejado**
- [ ] Análise e métricas
- [ ] Chat de suporte
- [ ] Sistema de níveis/gamificação
- [ ] Modo offline
- [ ] Testes E2E

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### **Padrões de Código**
- Use TypeScript para tipagem
- Siga os padrões do ESLint/Prettier
- Escreva testes para novas funcionalidades
- Documente componentes complexos
- Use commits semânticos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🎯 Roadmap

### **Q1 2024**
- [ ] Sistema de raspadinhas funcional
- [ ] Integração com gateway de pagamento
- [ ] Testes E2E com Playwright

### **Q2 2024**
- [ ] App mobile (React Native/Flutter)
- [ ] Sistema de notificações
- [ ] Analytics avançados

### **Q3 2024**
- [ ] IA para recomendações
- [ ] Sistema de torneios
- [ ] Programa de fidelidade

---

**Desenvolvido com ❤️ usando Vue 3, TypeScript e as melhores práticas de desenvolvimento moderno.**
