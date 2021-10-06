require('colors');
const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

let player1;
let player2;
let totalMoves;
let playerWon;
let board = [[' ', ' ', ' '], 
             [' ', ' ', ' '],
             [' ', ' ', ' ']
            ];

/*Print the board to console */
function printBoard() {

    console.log();
    console.log("-------------");
    for(let i = 0; i < board.length; i++) {
        let line = '';
        for(let j = 0; j < board[i].length; j++) {
            if(j == 0) 
                line += '| ' + board[i][j] + ' | ';
            else
                line += board[i][j] + ' | ';
        }
        console.log(line);
        console.log("-------------");
    }
    console.log("");
}

/*Check player performed a valid move or not */
function checkValidMove(rowNum, colNum) {
    if(board[rowNum][colNum] != ' ' || board[rowNum][colNum] == undefined) 
        return false;
    else
        return true;
}

/*Utility function of check which player won the game */
function checkWinner() {
    // 1. Combination 1 horizontally first row
    if(board[0][0] == board[0][1] && board[0][0] == board[0][2] && board[0][0] != ' ') {
        playerWon = board[0][0];
    }

    // 2. Combination 2 horizontal second row
    else if(board[1][0] == board[1][1] && board[1][0] == board[1][2] && board[1][0] != ' ') {
        playerWon = board[1][0];
    }

    // 3. Combination 3 horizontal third row
    else if(board[2][0] == board[2][1] && board[2][0] == board[2][2] && board[2][0] != ' ') {
        playerWon = board[2][0];
    }

    // 4. Combination 4 Diagonal 1
    else if(board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] != ' ') {
        playerWon = board[0][0];
    }

    // 5. Combination 5 Diagonal 2
    else if(board[2][0] == board[1][1] && board[2][0] == board[0][2]&& board[2][0] != ' ') {
        playerWon = board[2][0];
    }

    // 6. Combination 6 vertical first column
    else if(board[0][0] == board[1][0] && board[0][0] == board[2][0] && board[0][0] != ' ') {
        playerWon = board[0][0];
    }

    // 7. Combination 7 vertical second column
    else if(board[0][1] == board[1][1] && board[0][1] == board[2][1] && board[0][1] != ' ') {
        playerWon = board[0][1];
    }

    // 8. Combination 8 vertical third column
    else if(board[0][2] == board[1][2] && board[0][2] == board[2][2] && board[0][2] != ' ') {
        playerWon = board[0][2];
    }

    else if(playerWon == undefined && totalMoves == 9) {
        console.log("Game Tie !!".blue.bold);
        process.exit();
    }
    return;
}

/*Utility function to perform moves on board*/
function playMove(player) {
    printBoard();
    console.log("Enter your move position(1,2,3...) on board - Player".white.bgBlack.bold, player);
    console.log("======================================================");
    readLine.question("\n", function(position){
        console.log("");
        let validPostitionNum = parseInt(position);
        let rowNum = parseInt((validPostitionNum - 1) / 3);
        let colNum = parseInt((validPostitionNum - 1) % 3);

        // In case of invalid position on board entered
        if(checkValidMove(rowNum, colNum) == false) {
            console.log("Enter correct position: ".white.bold);
            console.log("=======================")
            playMove(player);
        }

        else {
            board[rowNum][colNum] = player;
            checkWinner();
            if(playerWon) {
                console.log(playerWon == player1 ? "Player 1" : "Player 2","won the game !!!".green.bold);
                console.log();
                printBoard();
                process.exit();
            }
            else {
                totalMoves++;
                player == player1 ? playMove(player2) : playMove(player1);
            }
        }
    })
}

/*Main function to start the game */
function startGame() {
    readLine.question('Player 1 choose your player, enter either X or 0(zero) !\n=======================================================\n'.white.bold, function(userInput){
        if(userInput.toUpperCase() == 'X') {
            player1 = 'X';
            player2 = '0';
            playMove(player1);
        }
        else if(userInput == '0') {
            player1 = '0';
            player2 = 'X';
            playMove(player1);
        }
        else {
            console.log();
            console.log("Enter a valid input".white.bgRed.bold);
            console.log();
            startGame();
        }
    })
}

console.log("==================================================")
console.log("Welcome to Quovantis's, 2 players tic tac toe game".black.bgGreen.bold);
console.log("==================================================\n")
startGame();