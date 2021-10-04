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

function verificaSelectCalculaTotalVenda(event){
    let divPai =  event.target.parentNode.parentNode;
    let select = divPai.querySelector("div.div-2 > select")
    if(select.selectedIndex !== undefined) {
        calculaValorTotalVenda(event);
    }
}

function calculaValorTotalVenda(event) {
    let valorTotal = 0;
    let quantidade = document.querySelectorAll("#produtosVenda > div > div.div-3 > input");
    let produtos = document.querySelectorAll("#produtosVenda > div > div.div-2 > select");
    produtos.forEach((element, i) => {
        element = element.options[element.selectedIndex];
        valorTotal += parseFloat(element.getAttribute('preco')) * parseInt(quantidade[i].value)
    })
    document.querySelector("body > section > div > div > form > input").value = `Valor Total: ${valorTotal}`
}

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

function CarregaPrimeiroSelect () {
    let select = document.querySelector("#produtosVenda > div > div.div-2 > select");
    let options = criaOptionSelectVenda(produtos)
    options.forEach(element => {
        select.appendChild(element)
    })
}

function novoElemento(tagName, className){
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function criaLabel(nome) {
	const label = novoElemento('label', 'label');
	label.innerHTML = nome;
	return label;
}

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

function CriarInputQuantidadeVenda() {
	let input = novoElemento('input', 'inputQuantidadeProduto');
	input.setAttribute('type', 'number');
	input.setAttribute('name', 'quantidadeProduto');
	input.setAttribute('value', '0');
    return input;
}

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

