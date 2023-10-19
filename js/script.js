const btn = document.querySelector('button');

btn.addEventListener('click', function(){

  const numCell = 100;   //celle da generare

  const playground = document.getElementById('playground');

  playground.innerHTML = ''; //reset

  for (let i = 1; i <= numCell; i++){    //ciclo sulla griglia per stampare le celle
    let cell = drawCell(i);           // genero le celle
    playground.append(cell);        //aggiungo la cella alla griglia
  }

})

// funzione per disegnare le celle nella griglia 10x10

function drawCell(cellNumber){
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.addEventListener('click', function(){      //cambio colore alla cella quando ci clicco
    cell.classList.add('active');
    console.log('hai cliccato la cella:' + cellNumber);
  });
  return cell;
}