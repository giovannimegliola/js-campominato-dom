"use strict";


const btn = document.querySelector('button');
const difficultySelect = document.getElementById('levels');
const playground = document.getElementById('playground');

let coveredCells; // celle coperte prima di essere cliccate


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

  const bombs = generateBombs (numCell, bombCount);
  
  playground.innerHTML = ''; //reset

  
  let coveredCells = numCell - bombCount;

  let score = 0;


  for (let i = 1; i <= numCell; i++) {
    let cell = drawCell(i,numCell);

    cell.addEventListener('click', function() {

      if (bombs.includes(i)) {
        cell.classList.add('bomb-clicked'); // Hai preso una bomba, colora la cella di rosso
        endGame('Hai perso! hai preso una bomba. Il tuo punteggio è :' + score); // Termina la partita e mostra punteggio
      } else {
        cell.classList.add('active'); // Cella cliccata correttamente, colorala di azzurro
        coveredCells--;
        score++; //incrementa il punteggio in caso di casella azzurra
        if (coveredCells === 0) {
          endGame('Hai vinto! Il tuo punteggio è ; ' + score); // Tutte le celle non bomba sono state rivelate, il giocatore ha vinto
        }
      }
    });

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



// funzione messaggio di fine partita

function endGame(message) {
  const bombCells = document.querySelectorAll('.bomb-clicked'); // Seleziona tutte le celle rosse

  for (let i = 0; i < bombCells.length; i++) {
    const cell = bombCells[i];
    cell.innerHTML = '<i class="fa fa-bomb fa-beat"></i>'; // Aggiungi l'icona della bomba
  }
  alert(message); 
}