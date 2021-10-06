require("colors");
const readLine = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

/* To create an instance of a tic tac toe game */
function TicTacToe(
  _board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]
) {
  this.player1 = "X";
  this.player2 = "0";
  this.board = _board;
  this.totalMoves = this.countMoves();
  this.playerWon;

  // function to start the game
  this.startGame = function () {
    playMove.call(this, this.player1);
  };
  
  // function to check a valid move
  this.checkValidMove = function(rowNum, colNum) {
    if(this.board[rowNum][colNum] != ' ' || this.board[rowNum][colNum] == undefined) 
        return false;
    else
        return true;
  }

  // function to play moves on board
  let playMove = (player)=> {
    this.printBoard();
    console.log("Enter your move position(1,2,3...) on board - Player".white.bgBlack.bold, player);
    console.log("======================================================");
    readLine.question("\n", (position)=> {
        console.log("");
        let validPostitionNum = parseInt(position);
        let rowNum = parseInt((validPostitionNum - 1) / 3);
        let colNum = parseInt((validPostitionNum - 1) % 3);

        // In case of invalid position entered on board
        if(this.checkValidMove(rowNum, colNum) == false) {
          console.log("Enter correct position: ".white.bold);
          console.log("=======================")
          playMove(player);
      }

      else {
        this.board[rowNum][colNum] = player;
        this.totalMoves++;
        this.checkWinner();
        if(this.playerWon) {
            console.log(this.playerWon == this.player1 ? "Player 1" : "Player 2","won the game !!!".green.bold);
            console.log();
            this.printBoard();
            process.exit();
        }
        else {
            player == this.player1 ? playMove(this.player2) : playMove(this.player1);
        }
    }
    })
  };
}

// Assign printBoard() function to every instance of TicTacToe object
TicTacToe.prototype.printBoard = function () {
  console.log();
  console.log("-------------");
  for (let i = 0; i < this.board.length; i++) {
    let line = "";
    for (let j = 0; j < this.board[i].length; j++) {
      if (j == 0) line += "| " + this.board[i][j] + " | ";
      else line += this.board[i][j] + " | ";
    }
    console.log(line);
    console.log("-------------");
  }
  console.log("");
};

// Assign checkWinner() function to every instance of TicTacToe object
TicTacToe.prototype.checkWinner = function () {
  if (
    this.board[0][0] == this.board[0][1] &&
    this.board[0][0] == this.board[0][2] &&
    this.board[0][0] != " "
  ) {
    this.playerWon = this.board[0][0];
  }

  // 2. Combination 2 horizontal second row
  else if (
    this.board[1][0] == this.board[1][1] &&
    this.board[1][0] == this.board[1][2] &&
    this.board[1][0] != " "
  ) {
    this.playerWon = this.board[1][0];
  }

  // 3. Combination 3 horizontal third row
  else if (
    this.board[2][0] == this.board[2][1] &&
    this.board[2][0] == this.board[2][2] &&
    this.board[2][0] != " "
  ) {
    this.playerWon = this.board[2][0];
  }

  // 4. Combination 4 Diagonal 1
  else if (
    this.board[0][0] == this.board[1][1] &&
    this.board[0][0] == this.board[2][2] &&
    this.board[0][0] != " "
  ) {
    this.playerWon = this.board[0][0];
  }

  // 5. Combination 5 Diagonal 2
  else if (
    this.board[2][0] == this.board[1][1] &&
    this.board[2][0] == this.board[0][2] &&
    this.board[2][0] != " "
  ) {
    this.playerWon = this.board[2][0];
  }

  // 6. Combination 6 vertical first column
  else if (
    this.board[0][0] == this.board[1][0] &&
    this.board[0][0] == this.board[2][0] &&
    this.board[0][0] != " "
  ) {
    this.playerWon = this.board[0][0];
  }

  // 7. Combination 7 vertical second column
  else if (
    this.board[0][1] == this.board[1][1] &&
    this.board[0][1] == this.board[2][1] &&
    this.board[0][1] != " "
  ) {
    this.playerWon = this.board[0][1];
  }

  // 8. Combination 8 vertical third column
  else if (
    this.board[0][2] == this.board[1][2] &&
    this.board[0][2] == this.board[2][2] &&
    this.board[0][2] != " "
  ) {
    this.playerWon = this.board[0][2];
  } else if (this.playerWon == undefined && this.totalMoves == 9) {
    console.log("Game Tie !!".blue.bold);
    process.exit();
  }
  return;
};

// Assign a countMoves() function to every instace of TicTacToe object
// to count moves made on a passed board
TicTacToe.prototype.countMoves = function() {
  let count = 0;
  for(let i = 0; i < this.board.length; i++) {
    for(let j = 0; j < this.board[i].length; j++) {
      if(this.board[i][j] != ' ') count++;
    }
  }
  return count;
}


let board = [
  ["X", "0", "0"],
  [" ", "X", " "],
  [" ", " ", " "],
];
let game = new TicTacToe(board);
game.startGame();