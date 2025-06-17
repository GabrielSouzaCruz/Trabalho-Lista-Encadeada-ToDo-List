# ToDo List Manager - Estrutura de Dados em JS

Um projeto para colocar em prática conceitos de Estrutura de Dados (Lista Duplamente Encadeada) com JavaScript puro, criando um gerenciador de tarefas funcional e interativo.

<br>

| 👨‍💻 Autor | 🟢 Status | 🚀 Linguagem |
| :--- | :--- | :--- |
| Gabriel | Concluído (para estudo) | JavaScript (ES6+) |

<br>

---

### 📝 Descrição do Projeto

Este projeto é uma aplicação web interativa de To-Do List, cujo principal objetivo é demonstrar a implementação e o uso de uma **Lista Duplamente Encadeada** para gerenciar as tarefas. Em vez de usar um simples array, a aplicação controla cada tarefa como um `nó` em uma lista, permitindo operações eficientes como adicionar tarefas urgentes no início ou completar a primeira tarefa da fila.

É uma abordagem prática para entender como estruturas de dados fundamentais podem ser aplicadas para resolver problemas do mundo real.

---

### 💡 Funcionalidades Principais

*   **Inserção Flexível de Tarefas:** Adicione tarefas em qualquer lugar:
    *   Como a mais **urgente** (início da lista).
    *   Como uma tarefa **normal** (fim da lista).

*   **Ordenação por Prioridade:** Novas tarefas são inseridas na posição correta de acordo com a prioridade (1 = alta, 3 = baixa), mantendo a lista sempre organizada.

*   **Gerenciamento Intuitivo:**
    *   Marque a "próxima tarefa" como realizada, removendo-a do topo da lista.
    *   Remova qualquer tarefa da lista com um simples clique.

*   **Visualização Rápida:**
    *   Veja qual é a próxima tarefa a ser feita.
    *   Identifique qual é a tarefa que está há mais tempo na lista.

*   **Persistência de Dados:** Salve sua lista de tarefas no navegador (`localStorage`) e carregue-a novamente quando voltar. Suas tarefas não serão perdidas!

---

### 🚀 Como Executar o Projeto

Como este é um projeto front-end com JavaScript puro, você não precisa de nenhuma instalação complexa.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/0Nimsay0/Deque_Js-Lista-de-Tarefas.git
    ```

2.  **Abra o arquivo principal:**
    Navegue até a pasta do projeto e abra o arquivo `index.html` diretamente no seu navegador de preferência (Google Chrome, Firefox, etc.).

    > **Dica:** Se você usa o Visual Studio Code com a extensão **Live Server**, basta clicar em `Go Live` no canto inferior direito para iniciar um servidor local e ver o projeto funcionando.

---

### 🛠️ Tecnologias e Ferramentas

*   **HTML5**
*   **CSS3**
*   **JavaScript (ES6+)**
    *   Classes, Módulos, `let`/`const`, Arrow Functions.
*   **Estrutura de Dados**
    *   Implementação manual de uma **Lista Duplamente Encadeada** (Deque).
*   **Bootstrap 5**
    *   Para a criação de uma interface limpa e responsiva.
*   **Font Awesome**
    *   Para os ícones utilizados na interface.

---

<p align="center">
  Desenvolvido com 💙 por Gabriel
</p>