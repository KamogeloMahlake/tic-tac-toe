const container = document.getElementById("container");
const dialog = document.querySelector("dialog");
const button = document.getElementById("restart");
const form = document.querySelector("form");
const div = document.getElementById("display");


function TicTacToe(p1, p2) {
  const matrix = [
    [],
    [],
    []
  ];

  const playerOne = new Player(p1.value, 1, "X");
  const playerTwo = new Player(p2.value, 2, "O");
  const span1 = document.getElementById("1");
  const span2 = document.getElementById("2");
  span1.textContent = playerOne.name;
  span2.textContent = playerTwo.name;

  const score1 = document.getElementById("s1");
  const score2 = document.getElementById("s2");
  score1.textContent = "0";
  score2.textContent = "0";

  const displayCurrent = document.getElementById("turn");

  let turn = 0;

  this.createSquares = function () {
    for (let i = 0; i < 3; i++)
    {
      for (let j = 0; j < 3; j++)
      {
        const square = document.createElement("div");
        square.id = `${i}-${j}`;
        square.addEventListener('click', () => {
          if (square.textContent) return;
          else
          {
              this.playGame(square);
          }
        });
        matrix[i].push(square);
        container.appendChild(square);
      }
    }
  };


  this.checkWinner = function (letter) {
    let diagonalCount = 0;
    for (let i = 0; i < 3; i++)
    {
      let rowCount = 0;
      let columnCount = 0;

      for (let j = 0; j < 3; j++)
      {
        if (matrix[i][j].textContent === letter) rowCount++;
        if (matrix[j][i].textContent === letter) columnCount++;
      }
      if (matrix[i][i].textContent === letter) diagonalCount++;
      if (rowCount === 3 || columnCount === 3 || diagonalCount === 3) return true;
    }
    if (matrix[0][2].textContent === letter && matrix[1][1].textContent === letter && matrix[2][0].textContent === letter) return true;
    return false;
  };

  this.clear = function() {
    for (let i = 0; i < 3; i++)
    {
      for (let j = 0; j < 3; j++)
      {
        matrix[i][j].textContent = "";
      }
    }
  };
  this.makeMove = function (id, letter) {
    const array = id.split("-");
    matrix[+array[0]][+array[1]].textContent = letter;
  }

  this.playGame = function (square) {
    let currentPlayer = turn % 2 === 0 ? playerOne : playerTwo
    
    this.makeMove(square.id, currentPlayer.letter);

    if (turn >= 8)
    {
      dialog.innerHTML = `<h3>It's a Tie</h3>`
      dialog.showModal();
      setTimeout(() => {
        dialog.close();
        this.clear();
        turn = 0;
        return;
      }, 2000);
    }

    if (this.checkWinner(currentPlayer.letter))
    {
      dialog.innerHTML = `<h3>Winner: ${currentPlayer.name}</h3>`;
      dialog.showModal();
      setTimeout(() => {
        displayCurrent.textContent = "";
        dialog.close();
        this.clear();
        turn = 0;
        if (currentPlayer.letter === "X") score1.textContent = +score1.textContent + 1;
        else score2.textContent = +score2.textContent + 1;
      }, 2000);
    }
    else
    {
      displayCurrent.textContent = turn % 2 === 0 ? `${playerTwo.name}'s turn (${playerTwo.letter})` : `${playerOne.name}'s turn (${playerOne.letter})`
    }
    turn++;
    
  };
}

function Player(name, value, letter)
{
  this.name = name;
  this.value = value;
  this.letter = letter;
  
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  form.classList.toggle('hidden');
  div.classList.toggle('hidden');

  const playerOne = document.getElementById("player1");
  const playerTwo = document.getElementById("player2");

  const game = new TicTacToe(playerOne, playerTwo);
  game.createSquares();
  button.addEventListener('click', game.clear)

})
