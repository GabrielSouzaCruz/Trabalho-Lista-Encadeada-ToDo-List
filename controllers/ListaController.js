/**
 * Este é o "cérebro" da nossa aplicação. Ele é responsável por:
 * 1. Conectar a interface (HTML) com a nossa lógica (as classes Tarefa e LinkedList).
 * 2. Ouvir os eventos do usuário (cliques nos botões).
 * 3. Chamar as funções apropriadas para manipular a lista de tarefas.
 * 4. Atualizar a tela para refletir o estado atual da lista.
 */

// Este evento garante que nosso script só será executado depois que toda a página HTML for carregada.
// Isso evita erros de "elemento não encontrado" se o script for carregado antes do HTML.
document.addEventListener('DOMContentLoaded', () => {

    // Cria a instância da nossa lista de tarefas. É aqui que tudo será armazenado em memória.
    const minhaLista = new LinkedList();

    // --- MAPEAMENTO DOS ELEMENTOS DO HTML (DOM) ---
    // Guardar os elementos em variáveis no início melhora a performance e organização do código.
    // Em vez de buscar o mesmo elemento várias vezes, já o temos em uma variável.
    
    // Inputs de texto do formulário
    const txtNovaTarefa = document.getElementById("txtnovaTarefa"); // Pega o campo de input da descrição da tarefa.
    const txtNovaPrioridade = document.getElementById("txtnovaPrioridade"); // Pega o campo de input da prioridade.
    
    // Botões da interface
    const btnInserirPrioridade = document.getElementById("btn-inserir-prioridade"); // Pega o botão de inserir tarefa.
    const btnMostrarInicio = document.getElementById("btn-mostrar-inicio"); // Pega o botão para ver a próxima tarefa.
    const btnMostrarAntiga = document.getElementById("btn-mostrar-antiga"); // Pega o botão para ver a tarefa mais antiga.
    const btnRemoverInicio = document.getElementById("btn-remover-inicio"); // Pega o botão para realizar a próxima tarefa.
    const btnSalvar = document.getElementById("btn-salvar"); // Pega o botão para salvar a lista.
    const btnCarregar = document.getElementById("btn-carregar"); // Pega o botão para carregar a lista.
    
    // Elementos de exibição na tela
    const listaTarefasElement = document.getElementById("list_listadeTarefas"); // Pega a <ul> onde as tarefas serão exibidas.
    const lblMostraTarefas = document.getElementById("lblmostraTarefas"); // Pega a div que mostra a mensagem "Lista vazia!".
    const mensagemRemocaoElement = document.getElementById("mensagem-remocao"); // Pega o alerta amarelo que mostra mensagens ao usuário.


    // --- EVENT LISTENERS (CONECTANDO BOTÕES A FUNÇÕES) ---
    // Aqui, dizemos ao JavaScript: "quando este botão for clicado, execute esta função".
    // Esta é a maneira moderna e recomendada de lidar com eventos, separando HTML e JS.
    btnInserirPrioridade.addEventListener('click', inserirPrioridade); // Conecta o clique no botão de inserir à função inserirPrioridade.
    btnRemoverInicio.addEventListener('click', removerElementoInicio); // Conecta o clique no botão de remover à função removerElementoInicio.
    btnMostrarInicio.addEventListener('click', mostrarElementoInicio); // Conecta o clique no botão de ver próxima à função mostrarElementoInicio.
    btnMostrarAntiga.addEventListener('click', mostrarTarefaAntiga); // Conecta o clique no botão de ver antiga à função mostrarTarefaAntiga.
    btnSalvar.addEventListener('click', saveLinkedListToLocalStorage); // Conecta o clique no botão de salvar à função de salvar.
    btnCarregar.addEventListener('click', loadLinkedListFromLocalStorage); // Conecta o clique no botão de carregar à função de carregar.


    //---------------------------------------------------------------------------------------------
    // FUNÇÕES DE LÓGICA DA APLICAÇÃO
    //---------------------------------------------------------------------------------------------

    // Função para limpar os campos de input após adicionar uma tarefa.
    function limpaInputs() {
        txtNovaTarefa.value = ""; // Apaga o texto do campo de descrição.
        txtNovaPrioridade.value = ""; // Apaga o texto do campo de prioridade.
        txtNovaTarefa.focus(); // Coloca o cursor de volta no campo de descrição para facilitar a digitação da próxima tarefa.
    }
    
    // Função que lê os valores dos inputs, valida-os e cria um novo objeto Tarefa.
    function leiaDadosTarefa() {
        const descricao = txtNovaTarefa.value.trim(); // Pega o valor do input e .trim() remove espaços em branco do início e fim.
        const prioridade = txtNovaPrioridade.value.trim(); // Pega o valor da prioridade e remove espaços.
        
        // Validação 1: verifica se os campos não estão vazios.
        if (descricao === "" || prioridade === "") {
            alert("Preencha os campos de descrição e prioridade!"); // Mostra um alerta para o usuário.
            return null; // Retorna nulo para indicar que a validação falhou e a criação da tarefa deve ser interrompida.
        }
        // Validação 2: verifica se a prioridade é um número (isNaN = is Not a Number) e se está entre 1 e 3.
        if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
            alert("A prioridade deve ser um número entre 1 e 3."); // Mostra um alerta de erro.
            return null; // Retorna nulo para interromper a operação.
        }
        
        // Se todas as validações passaram, cria e retorna uma nova instância da classe Tarefa.
        // `Number(prioridade)` converte o texto da prioridade para um tipo numérico.
        return new Tarefa(descricao, Number(prioridade), obterDataAtual(), obterHoraAtual());
    }
    
    // Função para inserir uma nova tarefa na lista, mantendo a ordem de prioridade.
    function inserirPrioridade() {
        const novaTarefa = leiaDadosTarefa(); // Chama a função para ler e validar os dados do formulário.
        if (novaTarefa === null) 
            return; // Se a leitura dos dados falhou (retornou null), interrompe a função aqui mesmo.

        const novaPrioridade = novaTarefa.prioridade; // Pega o valor da prioridade da tarefa recém-criada.

        // Caso 1: A lista está vazia ou a nova tarefa é a mais prioritária de todas (menor número).
        if (minhaLista.isEmpty() || novaPrioridade < minhaLista.getFirst().prioridade) {
            minhaLista.addFirst(novaTarefa); // Adiciona a tarefa no início da lista.
        } 
        // Caso 2: A nova tarefa é a menos prioritária de todas (maior ou igual ao último).
        else if (novaPrioridade >= minhaLista.getLast().prioridade) {
            minhaLista.addLast(novaTarefa); // Adiciona a tarefa no final da lista.
        } 
        // Caso 3: A nova tarefa deve ser inserida no meio da lista.
        else {
            let index = 0; // Inicia um contador de índice.
            // Percorre a lista para encontrar a posição correta para inserção.
            for (const tarefa of minhaLista) {
                if (novaPrioridade < tarefa.prioridade) {
                    break; // Encontrou a primeira tarefa com prioridade menor, então este é o lugar certo. Para o loop.
                }
                index++; // Se não, incrementa o índice e continua procurando.
            }
            minhaLista.addAtIndex(index, novaTarefa); // Insere a tarefa no índice encontrado.
        }
        limpaInputs(); // Limpa os campos do formulário para a próxima inserção.
        atualizarLista(); // Atualiza a exibição na tela para mostrar a nova tarefa.
    }
    
    // Função para mostrar qual é a próxima tarefa a ser feita (a primeira da lista).
    function mostrarElementoInicio() {
        if (minhaLista.isEmpty()) { // Verifica se a lista não está vazia.
            alert("Lista de Tarefas Vazia"); // Informa o usuário se estiver vazia.
            return; // Interrompe a função.
        }
        const proximaTarefa = minhaLista.getFirst(); // Pega o primeiro elemento da lista (sem removê-lo).
        mensagemRemocaoElement.innerHTML = "Próxima tarefa a ser realizada: " + proximaTarefa.descricao; // Escreve a mensagem no alerta.
        mensagemRemocaoElement.style.display = "block"; // Torna o alerta visível.
    }
    
    // Função que encontra e mostra qual é a tarefa mais antiga na lista.
    function mostrarTarefaAntiga() {
        if (minhaLista.isEmpty()) { // Verifica se a lista não está vazia.
            alert("Lista de Tarefas Vazia"); // Informa o usuário.
            return; // Interrompe a função.
        }
        let tarefaAntiga = null; // Variável para armazenar a tarefa mais antiga encontrada até o momento.
        // Percorre toda a lista para comparar as tarefas.
        for (const tarefa of minhaLista) {
            if (tarefaAntiga === null) { // Se for a primeira iteração, a primeira tarefa é, por enquanto, a mais antiga.
                tarefaAntiga = tarefa;
            } else { // Para as demais, compara a tarefa atual com a mais antiga já encontrada.
                tarefaAntiga = comparaTarefasDataHora(tarefaAntiga, tarefa);
            }
        }
        mensagemRemocaoElement.innerHTML = "Tarefa mais antiga registrada -- " + tarefaAntiga; // Mostra a tarefa encontrada no alerta.
        mensagemRemocaoElement.style.display = "block"; // Torna o alerta visível.
    }
    
    // Função para remover a primeira tarefa da lista (simulando que foi "realizada").
    function removerElementoInicio() {
        if (minhaLista.isEmpty()) { // Verifica se a lista tem algo para remover.
            alert("Lista de Tarefas Vazia"); // Informa o usuário se não tiver.
            return; // Interrompe a função.
        }
        const tarefaRealizada = minhaLista.removeFirst(); // Remove o primeiro elemento da lista e o armazena.
        const hora = obterHoraAtual(); // Pega a hora atual.
        const data = obterDataAtual(); // Pega a data atual.
        const diferencaHoras = calcularDiferencaHoras(tarefaRealizada.hora, hora); // Calcula quanto tempo passou em horas.
        const diferencaDias = calcularDiferencaDias(tarefaRealizada.data, data); // Calcula quanto tempo passou em dias.
        mostrarMensagemRemocao(tarefaRealizada, diferencaHoras, diferencaDias); // Mostra a mensagem de conclusão.
        atualizarLista(); // Atualiza a tela para remover o item da exibição.
    }
    
    // Função para remover uma tarefa específica com base no seu índice na lista.
    function removerTarefaPorIndice(index) {
        // Usa o método robusto da classe LinkedList que já trata os casos de início/fim/meio.
        const tarefaRemovida = minhaLista.removeAtIndex(index); 
        if (tarefaRemovida) { // Verifica se a remoção foi bem-sucedida (se não retornou null).
            const agora = obterHoraAtual(); // Pega a hora atual.
            const hoje = obterDataAtual(); // Pega a data atual.
            const horas = calcularDiferencaHoras(tarefaRemovida.hora, agora); // Calcula o tempo que a tarefa levou.
            const dias = calcularDiferencaDias(tarefaRemovida.data, hoje); // Calcula os dias que a tarefa levou.
            mostrarMensagemRemocao(tarefaRemovida, horas, dias); // Mostra a mensagem de conclusão.
            atualizarLista(); // Atualiza a tela para remover o item da exibição.
        }
    }
    
    // Função para exibir a mensagem de confirmação de remoção de uma tarefa.
    function mostrarMensagemRemocao(tarefaRealizada, hora, data) {
        mensagemRemocaoElement.innerHTML = `Tarefa realizada: ${tarefaRealizada.descricao} -- Levou ${data} dias e ${hora} (h:m:s)`; // Monta a string da mensagem.
        mensagemRemocaoElement.style.display = "block"; // Torna o alerta visível.
    }
    
    // Esta é uma das funções mais importantes: redesenha toda a lista de tarefas na tela.
    function atualizarLista() {
        listaTarefasElement.innerHTML = ""; // Limpa completamente a lista visual antiga antes de redesenhar.
        
        if (minhaLista.isEmpty()) { // Se a lista de dados estiver vazia...
            lblMostraTarefas.style.display = "block"; // Mostra a mensagem de "Lista vazia!".
            listaTarefasElement.style.display = "none"; // Esconde o container `<ul>` da lista.
        } else { // Se houver tarefas na lista...
            lblMostraTarefas.style.display = "none"; // Esconde a mensagem de "Lista vazia!".
            listaTarefasElement.style.display = "block"; // Garante que o container `<ul>` da lista esteja visível.
            
            // Este loop é a solução para o bug de remoção por clique.
            // `Array.from(minhaLista)`: Converte nossa lista encadeada (que é um iterável) em um array padrão.
            // `.entries()`: Transforma o array em pares de [índice, valor]. Ex: [[0, tarefa1], [1, tarefa2]].
            // `for (const [index, tarefa] of ...)`: A cada iteração, `index` e `tarefa` são criadas como novas constantes,
            // garantindo que cada evento de clique "lembre" do índice correto.
            for (const [index, tarefa] of Array.from(minhaLista).entries()) {
                const novaLinha = document.createElement("li"); // Cria um novo elemento HTML `<li>` em memória.
                novaLinha.innerHTML = tarefa.toString(); // Define o conteúdo do `<li>` com a string da tarefa.
                novaLinha.className = 'list-group-item list-group-item-action'; // Adiciona classes do Bootstrap para estilo.
                novaLinha.style.cursor = "pointer"; // Muda o cursor para uma "mãozinha" para indicar que é clicável.
                
                // Adiciona um evento de clique para CADA `<li>` que está sendo criado.
                novaLinha.addEventListener("click", () => {
                    // Quando o `<li>` é clicado, esta função é executada.
                    const confirmacao = confirm(`Deseja remover a tarefa: "${tarefa.descricao}"?`); // Mostra uma caixa de diálogo de confirmação.
                    if (confirmacao) { // Se o usuário clicar em "OK"...
                        // Chama a função para remover usando o 'index' que foi "congelado" no momento em que este listener foi criado.
                        removerTarefaPorIndice(index);
                    }
                });
                
                listaTarefasElement.appendChild(novaLinha); // Adiciona o `<li>` recém-criado e configurado na tela, dentro da `<ul>`.
            }
        }
    }
    
    //--------------------------------------------------------------------------------------------
    // FUNÇÕES COMPLEMENTARES (DATA, HORA, LOCALSTORAGE)
    //--------------------------------------------------------------------------------------------
    
    // Função que retorna a data atual formatada como "dd/mm/aaaa".
    function obterDataAtual() {
        let dataAtual = new Date(); // Cria um objeto Date com a data e hora atuais.
        let dia = dataAtual.getDate().toString().padStart(2, '0'); // Pega o dia e .padStart garante 2 dígitos (ex: 01, 02).
        let mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Pega o mês (que começa em 0, por isso +1) e formata.
        let ano = dataAtual.getFullYear(); // Pega o ano com 4 dígitos.
        return `${dia}/${mes}/${ano}`; // Retorna a string formatada.
    }

    // Função que retorna a hora atual formatada como "hh:mm:ss".
    function obterHoraAtual() {
        const data = new Date(); // Cria um novo objeto Date.
        const hora = data.getHours().toString().padStart(2, '0'); // Pega a hora e formata.
        const minuto = data.getMinutes().toString().padStart(2, '0'); // Pega o minuto e formata.
        const segundo = data.getSeconds().toString().padStart(2, '0'); // Pega o segundo e formata.
        return `${hora}:${minuto}:${segundo}`; // Retorna a string formatada.
    }
    
    // Função que calcula a diferença entre duas horas e retorna no formato "hh:mm:ss".
    function calcularDiferencaHoras(hora1, hora2) {
        const [h1, m1, s1] = hora1.split(':').map(Number); // Divide a string da hora1 em partes e as converte para números.
        const [h2, m2, s2] = hora2.split(':').map(Number); // Faz o mesmo para a hora2.
        const totalSegundos1 = h1 * 3600 + m1 * 60 + s1; // Converte a hora1 inteira para segundos.
        const totalSegundos2 = h2 * 3600 + m2 * 60 + s2; // Converte a hora2 inteira para segundos.
        const diferencaSegundos = Math.abs(totalSegundos2 - totalSegundos1); // Calcula a diferença absoluta (para não dar negativo).
        const horas = Math.floor(diferencaSegundos / 3600); // Converte de volta para horas.
        const minutos = Math.floor((diferencaSegundos % 3600) / 60); // Pega o resto e converte para minutos.
        const segundos = diferencaSegundos % 60; // Pega o resto final, que são os segundos.
        return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`; // Retorna a string formatada.
    }

    // Função que calcula a diferença de dias entre duas datas.
    function calcularDiferencaDias(dataInicial, dataFinal) {
        const msPorDia = 24 * 60 * 60 * 1000; // Constante com a quantidade de milissegundos em um dia.
        const [diaIni, mesIni, anoIni] = dataInicial.split('/').map(Number); // Divide e converte a data inicial.
        const [diaFim, mesFim, anoFim] = dataFinal.split('/').map(Number); // Divide e converte a data final.
        const dataIni = new Date(anoIni, mesIni - 1, diaIni); // Cria um objeto Date para a data inicial (mês - 1).
        const dataFim = new Date(anoFim, mesFim - 1, diaFim); // Cria um objeto Date para a data final (mês - 1).
        const diferencaMs = dataFim - dataIni; // Calcula a diferença em milissegundos.
        return Math.floor(diferencaMs / msPorDia); // Converte de milissegundos para dias e arredonda para baixo.
    }

    // Função que converte uma data de "dd/mm/aaaa" para "aaaa-mm-dd".
    function converterDataFormatoISO8601(data) {
        const [dia, mes, ano] = data.split('/'); // Divide a data em partes.
        return `${ano}-${mes}-${dia}`; // Remonta na ordem ISO.
    }
    
    // Função que compara duas tarefas e retorna a que foi criada primeiro (a mais antiga).
    function comparaTarefasDataHora(tarefa1, tarefa2) {
        // Cria objetos Date completos (com data e hora) para poder compará-los diretamente.
        const dataHoraTarefa1 = new Date(`${converterDataFormatoISO8601(tarefa1.data)}T${tarefa1.hora}`);
        const dataHoraTarefa2 = new Date(`${converterDataFormatoISO8601(tarefa2.data)}T${tarefa2.hora}`);
        // Compara as datas. Se a data1 for menor, ela é mais antiga, então a retorna. Senão, retorna a data2.
        return dataHoraTarefa1 < dataHoraTarefa2 ? tarefa1 : tarefa2;
    }
    
    // Função que salva a lista de tarefas atual no armazenamento local do navegador.
    function saveLinkedListToLocalStorage() {
        if (minhaLista.isEmpty()) { // Verifica se há algo para salvar.
            alert("Nada para salvar, a lista está vazia!");
            return;
        }
        let listaParaSalvar = []; // Cria um array temporário.
        // Percorre a lista de tarefas.
        for (const item of minhaLista) {
            // Cria um objeto simples (sem ser da classe Tarefa) para cada item e o adiciona no array.
            // Isso é importante porque JSON não armazena métodos de classe, apenas dados.
            listaParaSalvar.push({
                descricao: item.descricao,
                prioridade: item.prioridade,
                data: item.data,
                hora: item.hora
            });
        };
        // Converte o array de objetos em uma única string no formato JSON.
        localStorage.setItem('minhaListaDeTarefas', JSON.stringify(listaParaSalvar));
        alert("Lista salva com sucesso!"); // Informa o usuário.
    }

    // Função que carrega uma lista de tarefas salva no armazenamento local.
    function loadLinkedListFromLocalStorage() {
        // Pega a string JSON que foi salva no localStorage.
        const jsonStr = localStorage.getItem('minhaListaDeTarefas');
        if (jsonStr) { // Se a string existir...
            minhaLista.limpar(); // Esvazia a lista atual em memória antes de carregar a nova.
            const listaCarregada = JSON.parse(jsonStr); // Converte a string JSON de volta para um array de objetos.
            // Percorre os objetos carregados.
            for (const obj of listaCarregada) {
                // Para cada objeto, recria uma instância completa da classe Tarefa.
                const novaTarefa = new Tarefa(obj.descricao, obj.prioridade, obj.data, obj.hora);
                minhaLista.addLast(novaTarefa); // Adiciona a tarefa recriada à nossa lista encadeada.
            }
            atualizarLista(); // Atualiza a tela para exibir a lista que acabamos de carregar.
            alert("Lista carregada com sucesso!"); // Informa o usuário.
        } else { // Se não encontrou nada salvo...
            alert("Nenhuma lista salva foi encontrada."); // Informa o usuário.
        }
    }
});