const btn = document.querySelector('button');
const difficultySelect = document.getElementById('levels');
const playground = document.getElementById('playground');

btn.addEventListener('click', function() {
  let numCell;

  // Leggi il livello di difficoltà selezionato dalla select
  const selectedDifficulty = difficultySelect.value;

  // Imposta il numero di celle in base al livello di difficoltà
  if (selectedDifficulty === '1') {
    numCell = 100;
  } else if (selectedDifficulty === '2') {
    numCell = 81;
  } else if (selectedDifficulty === '3') {
    numCell = 49;
  }

  const bombCount = 16;
  
  playground.innerHTML = ''; //reset

  const bombs = generateBombs (numCell, bombCount);

  for (let i = 1; i <= numCell; i++) {
    let cell = drawCell(i,numCell);
    if (bombs.includes(i)) {
      cell.classList.add('bomb');
    }
    playground.append(cell);
  }
});


// funzione per la generazione delle bombe

function generateBombs(numCell, bombCount) {
  const bombs = [];
  while (bombs.length < bombCount) {
    const bombLocation = Math.floor(Math.random() * numCell) + 1;
    if (!bombs.includes(bombLocation)) {
      bombs.push(bombLocation);
    }
  }
  return bombs;
}


// funzione per disegnare le celle nella griglia 10x10

function drawCell(cellNumber,numCell) {
  const cellWidth = Math.sqrt(numCell);
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.style.width = `calc(100% / ${cellWidth})`;
  cell.style.height = cell.style.width;
  cell.addEventListener('click', function() {
    cell.classList.add('active');
    console.log('hai cliccato la cella:' + cellNumber);
  });
  return cell;
}
