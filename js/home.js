//Produtos cadastrados no sistema
const produtos = [
    {
        "nome": "Arroz Capitólio Ouro",
        "value": "1",
        "preco": "15.00"
    },
    {
        "nome": "Arroz Dona Rita",
        "value": "2",
        "preco": "14.00"
    },
    {
        "nome": "Arroz maná",
        "value": "3",
        "preco": "13.00"
    },
    {
        "nome": "Café Robson",
        "value": "3",
        "preco": "8.50"
    }
]

//Adiciona evento que irá chamar fução que irá executar assim que a página for carregada
document.addEventListener('DOMContentLoaded', PaginaCarregada);

//Adiciona evento no butão de adicionar novo Produto 
document.querySelector("#botaoAdicionarProdutoVenda").addEventListener(
	'click', AdicionarProdutoVenda, false
);


//Adiciona evento para quando mudar a quantidade calcular o valor total 
document.querySelector("#produtosVenda > div > div.div-2 > select").addEventListener(
    'change', calculaValorTotalVenda
);

//Adiciona evento para quando mudar a quantidade calcular o valor total
document.querySelector("#produtosVenda > div > div.div-3 > input").addEventListener(
    'change', verificaSelectCalculaTotalVenda
)

//Função padrão onde será chamada funções que seão executadas ao a página ser carregada 
function PaginaCarregada() {
    CarregaPrimeiroSelect()
}

//Verifica se ja existe um produto selecionado para o campo quantidade, se sim e chamado a função de calcular valor total
function verificaSelectCalculaTotalVenda(event){
    let divPai =  event.target.parentNode.parentNode;
    let select = divPai.querySelector("div.div-2 > select")
    if(select.selectedIndex !== undefined) {
        calculaValorTotalVenda(event);
    }
}

//Calcula o valor total da venda
function calculaValorTotalVenda(event) {
    let valorTotal = 0;
    let quantidade = document.querySelectorAll("#produtosVenda > div > div.div-3 > input");
    let produtos = document.querySelectorAll("#produtosVenda > div > div.div-2 > select");
    produtos.forEach((element, i) => {
        element = element.options[element.selectedIndex];
        valorTotal += parseFloat(element.getAttribute('preco')) * parseInt(quantidade[i].value)
    })
    document.querySelector("body > section > div > div > form > input").value = `Valor Total: ${valorTotal.toFixed(2)}`
}

//Cria os options dos selects a partir do objeto produtos 
function criaOptionSelectVenda(produtos){
    let options = [];
    produtos.forEach(element => {
        let option = document.createElement('option')
        option.setAttribute('value', element.nome);
        option.setAttribute('preco', element.preco);
        option.innerHTML = element.nome;
        options.push(option)
    });
    return options;
}

// constroi o select default do sistema
function CarregaPrimeiroSelect () {
    let select = document.querySelector("#produtosVenda > div > div.div-2 > select");
    let options = criaOptionSelectVenda(produtos)
    options.forEach(element => {
        select.appendChild(element)
    })
}

//função generica de construção de elemento com classe
function novoElemento(tagName, className){
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

//função generica de criação de label
function criaLabel(nome) {
	const label = novoElemento('label', 'label');
	label.innerHTML = nome;
	return label;
}

//cria o select de produto 
function CriarInputProdutoVenda() {
    let select = novoElemento('select', 'input');
	select.setAttribute('name', 'produto');
    let optionDisabled = document.createElement('option');
    optionDisabled.setAttribute('value', '-1');
    optionDisabled.setAttribute('disabled', '');
    optionDisabled.setAttribute('selected', '');
    optionDisabled.setAttribute('preco', '0.0');
    optionDisabled.innerHTML = "Selecione"
    select.appendChild(optionDisabled);
    let options = criaOptionSelectVenda(produtos)
    options.forEach(element => {
        select.appendChild(element)
    })
    return select;
}

// cria o input de venda
function CriarInputQuantidadeVenda() {
	let input = novoElemento('input', 'inputQuantidadeProduto');
	input.setAttribute('type', 'number');
	input.setAttribute('name', 'quantidadeProduto');
	input.setAttribute('value', '0');
    return input;
}

//Função que adiciona um campo de seleção de produto e quantidade na tela de venda 
function AdicionarProdutoVenda(event) {
	event.preventDefault();
	let usuarioLogin = document.querySelector("div#produtosVenda");
	let divPai = novoElemento('div', 'div-1');
	let divProduto = novoElemento('div', 'div-2');
	let divQuantidade = novoElemento('div', 'div-3');
	let labelProduto = criaLabel('Produto');
	let labelQuantidade = criaLabel('Quantidade');
	let inputProduto = CriarInputProdutoVenda();
    inputProduto.addEventListener('change', calculaValorTotalVenda);
	let inputQuantidade = CriarInputQuantidadeVenda();
    inputQuantidade.addEventListener('change', verificaSelectCalculaTotalVenda);
	divProduto.appendChild(labelProduto);
	divProduto.appendChild(inputProduto);
	divQuantidade.appendChild(labelQuantidade);
	divQuantidade.appendChild(inputQuantidade);
	divPai.appendChild(divProduto);
	divPai.appendChild(divQuantidade);
	usuarioLogin.appendChild(divPai);
}

