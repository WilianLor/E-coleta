
function populatesUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json()} )
    .then( states => {

        for( let state of states){
    ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
    } )
}

populatesUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
    
    fetch(url)
    .then( (res) => {return res.json()} )
    .then( cities => {
        
        for( let city of cities){
    citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false
    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta

const itensToColect = document.querySelectorAll(".items-grid li")

for(const item of itensToColect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [];

function handleSelectedItem (event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    

    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => item == itemId)// isso será true ou false
    //se ja estiver selecionado, adicionar à seleção
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            return item != itemId
        })

        selectedItems = filteredItems
    } else {
        //se não estiver selecionado adicionar a seleção
        selectedItems.push(itemId)
    }
    

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
    

}