document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll("[data-cell]");
    const board = document.getElementById("board");
    const messageElement = document.getElementById("message");
    const messageText = document.getElementById("message-text");
    const restartButton = document.getElementById("restart-button");
  
    let currentPlayer = "x";
    let isGameActive = true;
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    // Initialize the game
    const startGame = () => {
      currentPlayer = "x";
      isGameActive = true;
      messageElement.style.display = "none";
      board.classList.remove("x", "o");
      board.classList.add(currentPlayer);
  
      cells.forEach((cell) => {
        cell.textContent = ""; // Clear symbols
        cell.classList.remove("x", "o", "win");
        cell.addEventListener("click", handleCellClick, { once: true });
      });
    };
  
    // Handle a cell click
    const handleCellClick = (e) => {
      const cell = e.target;
      if (!isGameActive) return;
  
      cell.classList.add(currentPlayer);
      cell.textContent = currentPlayer.toUpperCase(); // Add the symbol
      if (checkWin(currentPlayer)) {
        endGame(false);
      } else if (isDraw()) {
        endGame(true);
      } else {
        switchPlayer();
      }
    };
  
    // Switch player turn
    const switchPlayer = () => {
      currentPlayer = currentPlayer === "x" ? "o" : "x";
      setBoardHoverClass();
    };
  
    // Set hover effect for the board
    const setBoardHoverClass = () => {
      board.classList.remove("x", "o");
      if (isGameActive) board.classList.add(currentPlayer);
    };
  
    // Check if the game is a draw
    const isDraw = () => {
      return [...cells].every((cell) => cell.classList.contains("x") || cell.classList.contains("o"));
    };
  
    // Check if a player has won
    const checkWin = (player) => {
      return winningCombinations.some((combination) => {
        const hasWon = combination.every((index) => cells[index].classList.contains(player));
        if (hasWon) highlightWinningCombination(combination);
        return hasWon;
      });
    };
  
    // Highlight the winning cells
    const highlightWinningCombination = (combination) => {
      combination.forEach((index) => {
        cells[index].classList.add("win");
      });
    };
  
    // End the game
    const endGame = (isDraw) => {
      isGameActive = false;
      messageElement.style.display = "block";
      if (isDraw) {
        messageText.textContent = "It's a Draw!";
      } else {
        messageText.textContent = `${currentPlayer.toUpperCase()} Wins!`;
      }
    };
  
    // Restart the game
    restartButton.addEventListener("click", startGame);
  
    // Start the game initially
    startGame();
  });
  