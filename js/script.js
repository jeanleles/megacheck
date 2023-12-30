const addGame = document.getElementById('addGame')
const removeGames = document.getElementById('removeGames')
const checkResult = document.getElementById('checkResult')

const newgame = document.getElementById('newgame')
const listGames = document.querySelector('.games')

window.onload = function() {
    const jogosArmazenados = JSON.parse(localStorage.getItem('jogos')) || []
    jogosArmazenados.forEach(item => {
      listGames.appendChild(criarElemento(item))
    })
}

function criarElemento(jogo) {
    const div = document.createElement('div')
    div.classList.add('game')
  
    const paragrafo = document.createElement('p')
    paragrafo.textContent = jogo

    const span = document.createElement('span')
    span.textContent = 'x'

    div.appendChild(paragrafo)
    div.appendChild(span)
  
    return div
}

function adicionarJogoLocalStorage(novoJogo) {
    const jogosCadastrados = JSON.parse(localStorage.getItem('jogos')) || []
    jogosCadastrados.push(novoJogo)
    localStorage.setItem('jogos', JSON.stringify(jogosCadastrados))
}

addGame.addEventListener('click', () => {
    const jogo = newgame.value
    if (jogo != '') {
        adicionarJogoLocalStorage(jogo)
        const lastGame = document.querySelector('.game')
        listGames.insertBefore(criarElemento(jogo), lastGame)
        console.log(criarElemento(jogo))
    } else {
        alert("Digite os numeros do seu jogo.")
    }
    newgame.value = ""
    newgame.focus()
})


removeGames.addEventListener('click', () => {
    localStorage.removeItem('jogos')
    const listGames = document.querySelector('.games')
    while (listGames.firstChild) {
        listGames.removeChild(listGames.firstChild)
    }
})

function removerJogo(element) {
    const divPai = element.parentElement

    const textoParagrafo = divPai.querySelector('p').textContent
    const jogosSalvos = JSON.parse(localStorage.getItem('jogos')) || []

    const indexToRemove = jogosSalvos.indexOf(textoParagrafo)

    if (indexToRemove !== -1) {
        jogosSalvos.splice(indexToRemove, 1)
        localStorage.setItem('jogos', JSON.stringify(jogosSalvos))
    }
    divPai.remove()
}
  
listGames.addEventListener('click', event => {
    if (event.target.localName == "span")
        removerJogo(event.target)
})

const itensArmazenados = JSON.parse(localStorage.getItem('jogos')) || []

function validarResuldado(resultado) {
    const jogos = JSON.parse(localStorage.getItem('jogos')) || []
    
    if(jogos.some(jogo => jogo === resultado)) {
        return true
    }
    return false
}

checkResult.addEventListener('click', () => {
    const resultado = document.getElementById('resultado')
    if (resultado.value == '') { 
        alert('Digite o resultado final do concurso.')       
    } else if (validarResuldado(resultado.value)) {
        document.querySelector('.result').innerText = "Uaaaau! Você GANHOU!!! 🤑🤑🤑"
    }
    else {
        document.querySelector('.result').innerText = "Não foi dessa vez 😔"
    }
})