const container = document.getElementById("container");
const twoPlayersButton = document.getElementById("two-players");
const aiPlayerButton = document.getElementById("ai-player");
const startBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];


twoPlayersButton.addEventListener("click", () => {
  const form = document.createElement("form");
  form.innerHTML = `<div><input required type="text" placeholder="Player 1(X)" id="player1"/></div>
                    <div><input required type="text" placeholder="Player 2(O)" id="player2" /></div>
                    <div><button type="submit">Submit</button></div>`
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ticTacToe = new TicTacToe(document.getElementById('player1').value, document.getElementById('player2').value);
    container.innerHTML = '',
    createSquares(ticTacToe);
  });
  container.innerHTML = ``;
  container.appendChild(form);
});

aiPlayerButton.addEventListener("click", () => {
  container.innerHTML = `<div style="font-weight: bold; font: 3rem"><button id="x" >X</button><button id="o">O</button></div>`;

  container.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      return;
    });
  });
});

class TicTacToe
{
  constructor(one, two)
  {
    this.playerOne = 'X';
    this.playerTwo = 'O';
    this.playerOneName = one;
    this.playerTwoName = two;
  }

  actions(board)
  {
    const possibleActions = [];
    for (let i = 0; i < 3; i++)
    {
      for (let j = 0; j < 3; j++)
      {
        if (!board[i][j]) possibleActions.push([i, j]);
      }
    }
    return possibleActions;
  }
  
  player(board)
  {
    return this.actions(board).length % 2 == 0 ? this.playerTwo : this.playerOne;
  }

  result(board, action)
  {
    const copyBoard = JSON.parse(JSON.stringify(this.board));
    if (!copyBoard[action[0]][action[1]]) copyBoard[action[0]][action[1]] = this.player(copyBoard);
    return copyBoard;
  }

  winner(board)
  {
    for (let i = 0; i < 3; i++)
    {
      //console.log(board[i][0] === board[i][1] === board[i][2]);
      if (board[i][0] && (board[i][0] === board[i][1] && board[i][0] === board[i][2])) return board[i][0];
      else if (board[0][i] && (board[0][i] === board[1][i] && board[0][i] === board[2][i])) return board[0][i];
    }
    
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) return board[0][0];
    else if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) return board[0][2];

    return null;
  } 
  terminal(board)
  {
    if (this.winner(board) || this.actions(board).length === 0) return true;
    return false;
  }

  utility(board)
  {
    switch (this.winner(board)) 
    {
      case this.playerOne:
        return 1;
      case this.playerTwo:
        return -1;
      default:
        return 0;
    }
  }

  minimax(board)
  {
    if (this.terminal(board)) return null;
    
    if (this.player(board) === this.playerOne) return this.maxValue(board)[1];
    return this.minValue(board)[1];
  }

  minValue(board)
  {
    if (terminal(board)) return [this.utility(board), null];
    let value = 1;
    let move = null;

    for (const action in this.actions(board))
    {
      const [x, _y] = this.maxValue(this.result(board, action));

      if (x < value)
      {
        move = action;
        value = x;

        if (value === -1) break;
      }
        
    }
    return [value, move];
  }

  maxValue(board)
  {
    if (terminal(board)) return [this.utility(board), null];
    let value = -1;
    let move = null;

    for (const action in this.actions(board))
    {
      const [x, _y] = this.minValue(this.result(board, action));

      if (x > value)
      {
        move = action;
        value = x;

        if (value === 1) break;
      }
        
    }
    return [value, move];
  }

  /*playGame()
  {
    let currentPlayer = this.player(board);

  }*/

}

const createSquares = (ticTacToe) => {
    const grid = document.createElement("div");
    container.appendChild(grid);
    grid.id = 'grid';
    for (let i = 0; i < 3; i++)
    {
      for (let j = 0; j < 3; j++)
      {
        const square = document.createElement("button");
        square.id = `${i}-${j}`;
        square.className = 'grid-button';
        square.addEventListener('click', () => {
          if (square.textContent) return;
          
          square.textContent = ticTacToe.player(startBoard);
          startBoard[i][j] = ticTacToe.player(startBoard);
          if (ticTacToe.terminal(startBoard))
          {
            const dialog = document.createElement('dialog');
            dialog.close();
            dialog.innerHTML = `<button class='close'>Close</button>`
            
            switch (ticTacToe.winner(startBoard))
            {
              case 'X':
                dialog.innerHTML += `<h3>Winner: ${ticTacToe.playerOneName}</h3>`;
                break;
              case 'O':
                dialog.innerHTML += `<h3>Winner: ${ticTacToe.playerTwoName}</h3>`;
                break;
              default:
                dialog.innerHTML += `<h3>GAMEOVER: It's a Tie!!!</h3>`;
                break;
            } 
          document.querySelector('center').appendChild(dialog);
            
          dialog.showModal();
          dialog.querySelector('.close').addEventListener('click', () => document.querySelector('center').removeChild(dialog));
          setTimeout(() => clearBoard(), 2000);
          }
        });
        //matrix[i].push(square);
        grid.appendChild(square);
      }
    }
};

const clearBoard = () => {
  for (let i = 0; i < 3; i++)
  {
    startBoard[i][0] = null;
    startBoard[i][1] = null;
    startBoard[i][2] = null;
  }
  const buttons = document.querySelectorAll('.grid-button');
  buttons.forEach(button => button.textContent = '');

};
