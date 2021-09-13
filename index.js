const $start = document.getElementById('start')
const $game = document.getElementById('game')
const $time = document.getElementById('time')
const $timeHeader = document.getElementById('time-header')
const $resultHeader = document.getElementById('result-header')
const $result = document.getElementById('result')
const $gameTime = document.getElementById('game-time')
const colors = ['red', 'blue', 'green', 'yellow', 'gray', 'turquoise']
let score = 0
let isStartedGame = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBlockClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}

function handleBlockClick(event) {
  if (!isStartedGame) {
    return
  }

  if (event.target.dataset.block) {
    score++
    renderBox()
  }
}

function startGame() {
  setGameTime()
  score = 0
  isStartedGame = true
  $gameTime.setAttribute('disabled', 'true')
  $game.style.backgroundColor = '#fff'
  hide($start)

  const interval = setInterval(() => {
    let time = +$time.textContent
    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)

  renderBox()
}

function endGame() {
  isStartedGame = false
  setGameScore()
  $gameTime.removeAttribute('disabled')
  hide($timeHeader)
  show($resultHeader)
  $game.style.backgroundColor = '#ccc'
  $game.innerHTML = ''
  show($start)
}

function renderBox() {
  let boxSize = getRandom(30, 100)
  let boxBoudaries = $game.getBoundingClientRect()
  let maxTop = boxBoudaries.height - boxSize
  let maxLeft = boxBoudaries.width - boxSize
  let randomColorIndex = getRandom(0, colors.length)

  $game.innerHTML = ''
  const block = document.createElement('div')  
  $game.insertAdjacentElement('afterbegin', block)
  block.style.position = 'absolute'
  block.style.width = block.style.height = boxSize + 'px'
  block.style.left = getRandom(0, maxLeft) + 'px'
  block.style.top = getRandom(0, maxTop) + 'px'
  block.style.backgroundColor = colors[randomColorIndex]
  block.style.cursor = 'pointer' 
  block.setAttribute('data-block', 'true')
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function setGameScore() {
  $result.textContent = score
}

function setGameTime() {
  let time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}
