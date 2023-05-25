const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const speedElement = document.getElementById('speed')
const resetElement = document.getElementById('reset')
let timerStarted = false
let startTime
let timerInterval

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    
    let correct = true
    if (!timerStarted) startTimer()

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })
    if (correct) {
        updateSpeed()
        renderNewQuote()
        stopTimer()
    }
})

resetElement.addEventListener('click', () => {
    renderNewQuote()
    stopTimer()
})


function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    alert('TEST')
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
}

function startTimer() {
    timerStarted = true
    startTime = new Date()
    timerInterval = setInterval(() => {
        timerElement.innerText = getTimerTime()
    }, 1000)
}

function stopTimer() {
    timerStarted = false
    clearInterval(timerInterval)
    timerElement.innerText = 0
}

function updateSpeed() {
    const arrayLetters = quoteInputElement.value.split('')
    speed.innerText = `WPM: ${Math.floor((arrayLetters.length / 5) / (getTimerTime() / 60))}`
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()