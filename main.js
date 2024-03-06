// Seleciona o formulário pelo ID
const form = document.getElementById('form-atividade');

// Define as imagens para aprovado e reprovado
const imgAprovado = `<img src="./images/aprovado.png" alt="Emoji celebrando" />`;
const imgReprovado = `<img src="./images/reprovado.png" alt="Emoji decepcionado" />`;

// Arrays para armazenar atividades e notas
const atividades = [];
const notas = [];

// Define spans para exibir a classificação de aprovação/reprovação
const spanAprovado = `<span class="resultado aprovado">Aprovado</span>`;
const spanReprovado = `<span class="resultado reprovado">Reprovado</span>`;

// Solicita ao usuário a nota mínima
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));

// Define uma variável global para armazenar linhas da tabela
let linha = '';

// Evento de submissão do formulário
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Funções para adicionar linha, atualizar tabela e calcular a média final
    adicionarLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

// Função para adicionar linha à tabela
function adicionarLinha(){
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    // Verifica se a atividade já foi inserida
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade "${inputNomeAtividade.value}" já foi inserida.`);
    } else {
        // Adiciona a atividade e a nota aos arrays
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
    
        // Constrói a linha da tabela
        linha += `<tr>`;
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${parseFloat(inputNotaAtividade.value) >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += `</tr>`;
    }

    // Limpa os campos de entrada
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

// Função para atualizar a tabela com novas linhas
function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = ''; // Limpa o conteúdo da tabela
    corpoTabela.innerHTML = linha; // Adiciona as novas linhas à tabela
}

// Função para calcular a média final
function calculaMediaFinal() {
    let somaDasNotas = 0;

    // Soma todas as notas
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    // Calcula a média
    const media = somaDasNotas / notas.length;
    return media; // Retorna a média final
}

// Função para atualizar a exibição da média final e a classificação
function atualizaMediaFinal() {
   const mediaFinal = calculaMediaFinal(); // Calcula a média final

   // Atualiza o elemento HTML com a média final
   document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); // Arredonda para 2 casas decimais

   // Atualiza o elemento HTML com o resultado (aprovado ou reprovado)
   const resultado = mediaFinal >= 7 ? spanAprovado : spanReprovado;
   document.getElementById('media-final-resultado').innerHTML = resultado;
}
