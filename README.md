
# Tic-Tac-Toe

A classic Tic-Tac-Toe game built with JavaScript, HTML, and CSS. Play against another player or challenge an AI powered by the minimax algorithm.

## Features

- **Two-player mode:** Enter custom player names and compete head-to-head.
- **AI opponent:** Play against a computer opponent using optimal minimax strategy.
- **Interactive UI:** Simple, button-based grid for smooth gameplay.
- **Score tracking:** Keep track of scores across rounds.
- **Game reset:** Instantly reset the board for a new game.

## How to Play

1. **Clone this repository:**
   ```bash
   git clone https://github.com/KamogeloMahlake/tic-tac-toe.git
   ```
2. **Open `index.html` in your browser.**
3. **Choose a mode:**
   - Click "Two Players" and enter names for both players.
   - Or click "AI Player" and select if you want to play as X or O.
4. **Take turns clicking on the grid to make your move.**
5. The game will announce the winner or a tie, and you can reset to play again.

## How it Works

- The core logic is in `script.js`.
- For AI mode, the minimax algorithm computes the best possible move for the computer.
- The UI is dynamically generated using JavaScript, so no page reload is needed.

## Code Highlights

- **TicTacToe class:** Manages the game state, checks for winners, and runs the minimax algorithm.
- **createSquares:** Dynamically creates the grid and handles user input.
- **AI logic:** The `minimax` method ensures the AI never loses.

## Technologies Used

- JavaScript (main logic)
- HTML (structure)
- CSS (styling)
