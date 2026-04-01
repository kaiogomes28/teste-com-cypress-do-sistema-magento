## Teste QA - Automação E2E com Cypress
### Objetivo

- Este projeto tem como objetivo automatizar cenários end-to-end (E2E) utilizando Cypress, validando fluxos críticos de um e-commerce baseado no Magento.

#### Os testes cobrem:

- Cadastro de usuário
- Login
- Adição de produto ao carrinho
- Finalização de compra

### Tecnologias Utilizadas
- Cypress → Framework de automação E2E
- JavaScript (ES6+)
- ESLint (Flat Config) → Padronização de código
- Testing Library (Cypress) → Seletores mais robustos
- nanoid → Geração de dados dinâmicos
- cypress-real-events → Simulação de interações reais

### Instalação do Projeto

- Foi criado um script personalizado para facilitar a instalação das dependências:
  
```npm run install-dep```

- Ou manualmente:

```npm install```

### Execução dos Testes

- Rodar testes em modo headless

```npm run cypress:run```

- Rodar testes com navegador chorme visível (headed) 

```npm run test:e2e:headed```

- Abrir interface interativa do Cypress

```npm run cypress:open```

### Lint (Padronização de Código)

- Para garantir qualidade e padronização:

#### npm run lint

- O que o ESLint valida:
  - Boas práticas com Cypress
  - Organização de imports
  - Uso correto de async flows
  - Padrões consistentes de identação
  - Prevenção de erros comuns em testes E2E

#### Plugins utilizados:

- eslint-plugin-cypress
- eslint-plugin-mocha
- eslint-plugin-import
- simple-import-sort


### Estrutura do Projeto

```js
cypress/
│
├── e2e/
│   └── magento-qa-fluxos.cy.js   # Cenários de teste
│
├── pages/                        # Page Objects
│   ├── login.js
│   ├── product.js
│   ├── checkout-cart.js
│   ├── payment.js
│   ├── user-registration.js
│   └── customer-account.js
│
├── support/
│   ├── commands.js              # Comandos customizados
│   └── e2e.js
│
├── cypress.config.js
└── eslint.config.mjs
```

### Padrão Utilizado: Page Object Model (POM)

- Foi utilizado o padrão Page Object Model para:
  - Melhorar a organização
  - Evitar duplicação de código
  - Facilitar manutenção
  - Aumentar legibilidade dos testes
- Exemplo:
  - Cada página encapsula suas ações:

```js
// product.js
export function addProductToCart() {
  // ações da página
}
```

- E no teste:

```js
import { addProductToCart } from '../pages/product';

addProductToCart();
```

### Comandos Customizados

- Os comandos foram centralizados em:

```cypress/support/commands.js```

- Benefícios:
  - Reutilização de código
  - Abstração de lógica complexa
  - Testes mais limpos e legíveis
- Exemplos:

```cy.registerUser(user);```
```cy.logoutUser();```

### Cenários Automatizados
#### Scenario 1: Cadastro de Usuário

- Fluxo:
  - Preenchimento do formulário com dados válidos
  - Criação de usuário
  - Validação de sucesso
  - Logout
- Validações:
  - Mensagem de sucesso
  - Dados do usuário exibidos
  - Redirecionamento após logout

#### Scenario 2: Login

- Fluxo:
  - Login com usuário válido
- Validações:
  - Usuário autenticado
  - Elementos da conta visíveis

#### Scenario 3: Adicionar Produto ao Carrinho

- Fluxo:
  - Seleção de produto
  - Adição ao carrinho
- Validações:
  - Produto presente no carrinho

#### Scenario 4: Checkout Completo

- Fluxo:
  - Carrinho → Checkout
  - Preenchimento de endereço
  - Seleção de pagamento
  - Finalização da compra
- Validações:
  - Pedido criado com sucesso

### Uso de Intercepts

-  Foi utilizado cy.intercept para:
  - Monitorar requisições
  - Aguardar respostas críticas
  - Evitar flakiness
- Exemplo:

```cy.intercept(paymentPage.intercept.postPaymentInformation).as('postPaymentInformation');```

### Boas Práticas Aplicadas

- Uso de dados dinâmicos com nanoid
- Evitar seletores frágeis (uso de Testing Library)
- Separação clara entre:
  - Testes
  - Page Objects
  - Comandos
  - Logs descritivos com cy.log
  - Estrutura escalável para novos cenários