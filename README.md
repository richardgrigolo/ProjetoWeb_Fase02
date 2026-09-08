# Documentação e Manual de Ajuda - PetShop Golden Shower (Fase 2)

Este documento contém o guia de funcionalidades do sistema web do **PetShop Golden Shower** e o detalhamento de todas as alterações e ajustes técnicos realizados na aplicação.

---

## 1. Visão Geral do Sistema

O sistema é uma aplicação web responsiva voltada para a divulgação de produtos e agendamento de serviços de banho e tosa focados na raça Golden Retriever. O projeto é composto por três páginas HTML interativas, estilizadas com **Bootstrap 5** e **CSS customizado**, além de scripts interativos em **JavaScript puro (Vanilla JS)**.

### Estrutura de Arquivos
- `index.html`: Página principal contendo vitrine de produtos, carrossel e catálogo de serviços.
- `cadastro.html`: Formulário de cadastro de tutores e pets.
- `agendamento.html`: Formulário dinâmico de agendamento de banho e tosa com cálculo automático de valores.
- `css/style.css`: Estilização customizada e regras para o modo de Alto Contraste.
- `js/script.js`: Toda a lógica interativa (agendamento dinâmico, validações, carrossel, saudação e acessibilidade).

---

## 2. Funcionalidades da Página Web

### 2.1 Cabeçalho e Acessibilidade (Comum a todas as páginas)
- **Saudação Temporal:** Mensagem dinâmica no topo da página que detecta o horário do sistema do usuário (Ex: *"Bom dia!"*, *"Boa tarde!"* ou *"Boa noite!"*).
- **Modo Alto Contraste:** Botão presente no cabeçalho que alterna o tema da página para alto contraste (fundo escuro/preto com textos em amarelo/branco de alta legibilidade), visando a acessibilidade para pessoas com baixa visão.

### 2.2 Página Principal (`index.html`)
- **Carrossel Interativo:** Exibição rotativa (slides) com ofertas de rações, serviços de transporte e acessórios, utilizando o componente Carousel do Bootstrap com transição automática de 3 segundos.
- **Seções de Produtos:**
  - **Acessórios:** Exibição de produtos como coleiras e fêmeur bovino desidratado.
  - **Rações:** Catálogo de rações SuperPremium para filhotes e adultos.
  - **Higiene:** Tapetes higiênicos e lenços umedecidos.
- **Seção de Serviços:** Detalhamento do *Banho e Tosa Simples* e *Banho e Tosa Completo*, com botões de redirecionamento direto para a tela de agendamento.

### 2.3 Cadastro de Cliente e Pet (`cadastro.html`)
- **Formulário Unificado:** Permite o registro dos dados do tutor (Nome, CPF, Sexo, E-mail, Telefone e Endereço) e do pet (Nome, Raça e Idade).
- **Validação:** Campos obrigatórios marcados com `*` e validações nativas de tipo (e-mail, número, telefone e seleção obrigatória de sexo).
- **Feedback:** Disparo de modal/alerta confirmando a conclusão do cadastro ao enviar o formulário.

### 2.4 Agendamento de Serviços (`agendamento.html`)
- **Cálculo Automático de Preços:** Atualização em tempo real da caixa de valor (*R$ 0,00*, *R$ 110,00*, *R$ 130,00* ou *R$ 150,00*) conforme a combinação de serviço e modalidade escolhida.
- **Seleção de Data e Horário:** Pickers nativos para escolha da data e horário do atendimento.
- **Termos de Compromisso:** Checkbox obrigatório de aceite sobre as regras de tolerância de horário.

---

## 3. Resumo dos Ajustes Realizados

A transição da **Fase 01** (composta apenas por estrutura HTML estática) para a **Fase 02** (aplicação completa com estilização CSS/Bootstrap e dinamismo em JavaScript) envolveu a implementação de regras de negócio, acessibilidade e interatividade. Abaixo estão descritos os principais ajustes e correções aplicados:

### 3.1 Implementação de Estilização e Acessibilidade (Fase 01 ➔ Fase 02)
* **Fase 01:** Estrutura puramente textual em HTML sem recursos de acessibilidade visual ou estilização avançada.
* **Fase 02:** Integração do framework Bootstrap 5 com CSS customizado (`css/style.css`), inclusão do componente de Carrossel e criação do botão de **Alto Contraste** para melhorar a acessibilidade de usuários com baixa visão.

### 3.2 Implementação de Dinamismo no Agendamento e Preços
* **Problema (Fase 01):** Os campos de seleção (`<select>` e `<input type="radio">`) do formulário de agendamento eram estáticos e o valor do serviço não era calculado nem atualizado na tela.
* **Causa:** Ausência de manipuladores de eventos (*event listeners*) em JavaScript para monitorar as escolhas do usuário.
* **Solução (Fase 02):** Criação da função `atualizarRegrasAgendamento()` no arquivo `js/script.js`, vinculada ao evento `change` do seletor de serviços e dos botões de rádio de modalidade (`input[name="modalidade"]`), permitindo a atualização instantânea da caixa de valor (`#valorServico`).

### 3.3 Regras de Negócio e Modalidade para o Banho Completo
* **Fase 01:** Não havia diferenciação funcional entre as modalidades de atendimento.
* **Fase 02:** 
  * Ao selecionar *"Banho e Tosa Completo"*, o script marca automaticamente a opção *"Solicitar Tele-busca"* como padrão e exibe o valor de **R$ 150,00**.
  * **Flexibilidade Mantida:** Permite que o cliente altere a opção para *"Entregar na PetShop"* sem que o valor total seja reduzido, mantendo o preço fixo em **R$ 150,00**.
  * **Banho e Tosa Simples:** A regra recalcula o valor automaticamente conforme a escolha: **R$ 110,00** para *"Entregar na PetShop"* e **R$ 130,00** para *"Solicitar Tele-busca"*.

---

## 4. Instruções de Teste

1. Abra o arquivo `index.html` em qualquer navegador moderno.
2. NAVEGUE até a página de **Agendamento**.
3. Selecione o serviço **Banho e Tosa Simples**:
   - Com "Entregar na PetShop" selecionado, o valor exibido será **R$ 110,00**.
   - Alterne para "Solicitar Tele-busca", o valor mudará automaticamente para **R$ 130,00**.
4. Selecione o serviço **Banho e Tosa Completo**:
   - O rádio "Solicitar Tele-busca" será marcado automaticamente e o valor será **R$ 150,00**.
   - Alterne para "Entregar na PetShop", o valor permanecerá em **R$ 150,00**.
5. Clique no botão **Alto Contraste** no topo da tela para verificar a acessibilidade visual.
