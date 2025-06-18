/**
 * A classe Tarefa modela o objeto que queremos armazenar na nossa lista.
 * Ela contém todas as informações relevantes de uma tarefa.
 */
class Tarefa{
    // Campos privados para encapsular os dados da tarefa.
    #descricao;  // O texto da tarefa.
    #prioridade; // O nível de prioridade (ex: 1, 2, 3).
    #data;       // A data em que a tarefa foi criada.
    #hora;       // A hora em que a tarefa foi criada.
    
    // Construtor para criar uma nova instância de Tarefa com suas informações.
    constructor(descricao, prioridade, data, hora) {
        this.#descricao = descricao;
        this.#prioridade = prioridade;
        this.#data = data;
        this.#hora = hora;
    }
  
    // Métodos "get" e "set" para acessar e modificar as propriedades da tarefa.
    get descricao() {
        return this.#descricao;
    }
    set descricao(novaDescricao) {
        this.#descricao = novaDescricao;
    }

    get prioridade() {
        return this.#prioridade;
    }
    set prioridade(numPrioridade) {
        this.#prioridade = numPrioridade;
    }

    get data() {
        return this.#data;
    }
    set data(data) {
        this.#data = data;
    }

    get hora() {
        return this.#hora;
    }
    set hora(hora) {
        this.#hora = hora;
    }

    /**
     * Retorna uma representação em texto da tarefa, formatada para exibição na tela.
     * @returns {string} A string formatada.
     */
    toString() {
        return `Descrição: ${this.#descricao} - Prioridade: ${this.#prioridade} - Data: ${this.#data} - Hora: ${this.#hora}`;
    }
}