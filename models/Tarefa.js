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
     * Compara esta tarefa com outra para ver se são iguais.
     * Útil para futuras funcionalidades de busca ou verificação de duplicados.
     * @param {Tarefa} outraTarefa O objeto Tarefa a ser comparado.
     * @returns {boolean} Verdadeiro se a descrição e prioridade forem iguais.
     */
    equals(outraTarefa) {
        // Verifica se o objeto passado é realmente uma instância de Tarefa.
        if (!(outraTarefa instanceof Tarefa)) {
            return false;
        }
        // Compara os atributos relevantes para determinar a igualdade.
        return this.#prioridade === outraTarefa.prioridade && 
               this.#descricao === outraTarefa.descricao;
    }

    /**
     * Retorna uma representação em texto da tarefa, formatada para exibição na tela.
     * @returns {string} A string formatada.
     */
    toString() {
        return `Descrição: ${this.#descricao} - Prioridade: ${this.#prioridade} - Data: ${this.#data} - Hora: ${this.#hora}`;
    }
}