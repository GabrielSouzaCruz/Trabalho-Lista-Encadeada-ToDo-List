/**
 * A classe LinkedList implementa a estrutura de dados de uma Lista Duplamente Encadeada.
 * Ela gerencia a coleção de "Nós" e fornece métodos para adicionar, remover e acessar elementos.
 */
class LinkedList {
    // Campos privados para controlar a estrutura da lista.
    #head; // Ponteiro para o primeiro nó da lista (a "cabeça").
    #tail; // Ponteiro para o último nó da lista (a "cauda").
    #qtd;  // Contador para saber quantos elementos existem na lista.

    // O construtor inicializa uma lista vazia.
    constructor() {
        this.#head = null;
        this.#tail = null;
        this.#qtd = 0;
    }

    /**
     * Limpa a lista, redefinindo-a para seu estado inicial.
     */
    limpar() {
        this.#head = null;
        this.#tail = null;
        this.#qtd = 0;
    }

    /**
     * Adiciona um novo elemento no início da lista.
     * @param {*} novoDado O dado a ser adicionado.
     */
    addFirst(novoDado) {
        const novoNo = new No(novoDado);
        // Se a lista está vazia, o novo nó é tanto a cabeça quanto a cauda.
        if (this.isEmpty()) {
            this.#tail = novoNo;
        } else {
            // Se não, o "proximo" do novo nó aponta para a cabeça antiga.
            novoNo.proximo = this.#head;
            // E o "anterior" da cabeça antiga aponta para o novo nó.
            this.#head.anterior = novoNo;
        }
        // A cabeça da lista agora é o novo nó.
        this.#head = novoNo;
        this.#qtd++; // Incrementa a quantidade.
        return true;
    }

    /**
     * Adiciona um novo elemento no final da lista.
     * @param {*} novoDado O dado a ser adicionado.
     */
    addLast(novoDado) {
        const novoNo = new No(novoDado);
        // Se a lista está vazia, o novo nó é tanto a cabeça quanto a cauda.
        if (this.isEmpty()) {
            this.#head = novoNo;
        } else {
            // Se não, o "anterior" do novo nó aponta para a cauda antiga.
            novoNo.anterior = this.#tail;
            // E o "proximo" da cauda antiga aponta para o novo nó.
            this.#tail.proximo = novoNo;
        }
        // A cauda da lista agora é o novo nó.
        this.#tail = novoNo;
        this.#qtd++;
        return true;
    }

    /**
     * Adiciona um novo elemento em um índice específico no meio da lista.
     * @param {number} index A posição onde o novo dado será inserido.
     * @param {*} novoDado O dado a ser adicionado.
     */
    addAtIndex(index, novoDado) {
        const novoNo = new No(novoDado);
        let aux = this.#head;
        let pos = 0;
        // Percorre a lista até encontrar o nó que ficará ANTES do novo nó.
        while (pos < index - 1) {
            aux = aux.proximo;
            pos++;
        }
        // "Religa" os ponteiros para encaixar o novo nó na posição correta.
        novoNo.anterior = aux;
        novoNo.proximo = aux.proximo;
        aux.proximo = novoNo;
        novoNo.proximo.anterior = novoNo;
        this.#qtd++;
        return true;
    }

    /**
     * Remove um elemento de um índice específico.
     * Este método é robusto: ele usa os outros métodos de remoção para os casos de início/fim.
     * @param {number} index O índice do elemento a ser removido.
     * @returns O dado do nó removido, ou null se o índice for inválido.
     */
    removeAtIndex(index) {
        // Validação para garantir que o índice está dentro dos limites da lista.
        if (index < 0 || index >= this.#qtd) {
            return null;
        }
        // Se o índice for 0, reutiliza a função de remover do início.
        if (index === 0) {
            return this.removeFirst();
        }
        // Se for o último índice, reutiliza a função de remover do fim.
        if (index === this.#qtd - 1) {
            return this.removeLast();
        }

        // Lógica para remover um elemento do meio da lista.
        let atual = this.#head;
        let pos = 0;
        // Percorre a lista até o nó que queremos remover.
        while (pos < index) {
            atual = atual.proximo;
            pos++;
        }

        const anterior = atual.anterior;
        const proximo = atual.proximo;
        // Faz o nó anterior "pular" o nó atual e apontar para o próximo.
        anterior.proximo = proximo;
        // Faz o nó próximo apontar para trás para o nó anterior.
        proximo.anterior = anterior;
        this.#qtd--;
        return atual.dado; // Retorna o dado que foi removido.
    }

    /**
     * Remove o primeiro elemento da lista.
     * @returns O dado do nó removido.
     */
    removeFirst() {
        if (this.isEmpty()) return null;
        const dadoRemovido = this.#head.dado;
        // A nova cabeça passa a ser o próximo elemento.
        this.#head = this.#head.proximo;
        // Se a lista não ficou vazia, o "anterior" da nova cabeça deve ser nulo.
        if (this.#head !== null) {
            this.#head.anterior = null;
        } else {
            // Se ficou vazia, a cauda também deve ser nula.
            this.#tail = null;
        }
        this.#qtd--;
        return dadoRemovido;
    }

    /**
     * Remove o último elemento da lista.
     * @returns O dado do nó removido.
     */
    removeLast() {
        if (this.isEmpty()) return null;
        const dadoRemovido = this.#tail.dado;
        // A nova cauda passa a ser o elemento anterior.
        this.#tail = this.#tail.anterior;
        // Se a lista não ficou vazia, o "proximo" da nova cauda deve ser nulo.
        if (this.#tail !== null) {
            this.#tail.proximo = null;
        } else {
            // Se ficou vazia, a cabeça também deve ser nula.
            this.#head = null;
        }
        this.#qtd--;
        return dadoRemovido;
    }
    
    // Retorna o dado do último elemento sem removê-lo.
    getLast() {
        if (this.isEmpty()) return null;
        return this.#tail.dado;
    }
    // Retorna o dado do primeiro elemento sem removê-lo.
    getFirst() {
        if (this.isEmpty()) return null;
        return this.#head.dado;
    }
    // Verifica se a lista não tem elementos.
    isEmpty() {
        return this.#head === null;
    }

    // Retorna a quantidade de elementos na lista.
    get length() {
        return this.#qtd;
    }

    /**
     * Este é o método que permite que a nossa classe seja usada em um loop `for...of`.
     * É um recurso avançado do JavaScript que torna nosso código muito mais limpo.
     * Ex: for (const tarefa of minhaLista) { ... }
     */
    [Symbol.iterator]() {
        let noAtual = this.#head;
        return {
            // A função `next` é chamada pelo loop `for...of` a cada iteração.
            next: function () {
                if (noAtual !== null) {
                    let valor = noAtual.dado;
                    noAtual = noAtual.proximo; // Avança para o próximo nó.
                    return { value: valor, done: false }; // Retorna o valor e indica que não terminou.
                } else {
                    return { done: true }; // Indica que a iteração acabou.
                }
            }
        };
    }

    // Método de depuração para converter a lista inteira em uma string.
    toString() {
        let result = "";
        let noAtual = this.#head;
        while (noAtual !== null) {
            result += noAtual;
            noAtual = noAtual.proximo;
        }
        return result;
    }
}