/**
 * A classe No representa o elemento fundamental de uma lista encadeada.
 * Cada "nó" contém um dado (a informação que queremos guardar) e ponteiros
 * para o nó anterior e o próximo nó na sequência.
 */
class No {
  // Campos privados para garantir que só possam ser acessados através dos métodos da classe.
  #dado;      // O valor/informação que o nó armazena (ex: um objeto Tarefa).
  #anterior;  // Referência (ponteiro) para o nó que vem antes deste na lista.
  #proximo;   // Referência (ponteiro) para o nó que vem depois deste na lista.
  
  // O construtor é chamado quando criamos um novo nó (ex: new No(minhaTarefa)).
  constructor (novoDado){
    this.#dado = novoDado;
    // Um nó recém-criado ainda não está conectado a nada, então seus ponteiros são nulos.
    this.#anterior = null;
    this.#proximo = null;
  }

  // Métodos "get" e "set" permitem acessar e modificar os campos privados de forma controlada.

  // Retorna o dado armazenado no nó.
  get dado() {
    return this.#dado;
  }
  // Define um novo dado para o nó.
  set dado(novoDado) {
    this.#dado = novoDado;
  }

  // Retorna a referência ao nó anterior.
  get anterior() {
    return this.#anterior;
  }
  // Define a referência ao nó anterior.
  set anterior(novoAnterior) {
    this.#anterior = novoAnterior;
  }

  // Retorna a referência ao nó próximo.
  get proximo() {
    return this.#proximo;
  }
  // Define a referência ao nó próximo.
  set proximo(novoProximo) {
    this.#proximo = novoProximo;
  }

  // Método para facilitar a visualização do nó (usado principalmente para depuração).
  toString() {
    return `<-| dado: ${this.#dado} |->`;
  }
}