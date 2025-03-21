function gameBoard(){
    const board = [];
    
    const printBoard = () => {
        board.forEach((x) => {
            console.log(` [${x[0].getValue()}] [${x[1].getValue()}] [${x[2].getValue()}]`); 
            console.log("\n");
        })
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

    }


    for (let i = 0; i < 3; i++){
        board.push([]);
        for (let j = 0; j < 3; j++){
            board[i].push(cell());
        }
    }

    

    return {board, printBoard};
}



function cell(){
    let value;

    const getValue = () => {
        return value == undefined ? " " : value;
    }
    const setValue = (newValue) => {
        if (value == undefined){
            value = newValue;
        } else {
            return -1;
        }
    }

    return {getValue, setValue}
}


function player(newName, newMarker){
    let name = newName;
    let marker = newMarker;


    const getName = () => {
        return name;
    }
    const getMarker = () => {
        return marker;
    }

    const setName = (newName) => {
        name = newName;
    }

    return {setName,getName, getMarker};
}

function consoleGame(){
    const game = gameBoard();
    const board = game.board;


    const player1 = player("Player1", "X");
    const player2 = player("Player2", "O");

    let playerTurn = player1;

    // player1.setName(prompt("Please enter a name for Player 1"));
    // player2.setName(prompt("Please enter a name for Player 2"));





    for(let i = 0; i < 9; i++){
        console.log(playerTurn.getName() + "'s Turn to place " + playerTurn.getMarker());
        

        if (playerTurn == player1){

            // do {
            //     const row = prompt("row")
            //     const column = prompt("col")
            //     if (board[row][column].setValue(playerTurn.getMarker()) != -1){
            //         break;
            //     };
            // } while(true);

            do {
                const row = Math.floor(Math.random() * 3);
                const column = Math.floor(Math.random() * 3);
                if (board[row][column].setValue(playerTurn.getMarker()) != -1){
                    break;
                };
            } while(true);
        }
        else if (playerTurn == player2) {
            do {
                const row = Math.floor(Math.random() * 3);
                const column = Math.floor(Math.random() * 3);
                if (board[row][column].setValue(playerTurn.getMarker()) != -1){
                    break;
                };
            } while(true);
        }
        game.printBoard();

        if (checkWin()){
            console.log(playerTurn.getName() + " HAS WON THE GAME!");
            break;
        } 
        playerTurn = playerTurn === player1 ? player2 : player1;
    }


    function checkWin(){
        let winner = false;

        //Check Vertical Wins
        let values = [];
        for(let i = 0; i < 3; i++){
            values[i] = "";
            
            for(let j = 0; j < 3; j++){
                values[i] += (board[j][i].getValue());
            }
        }
        if(hasWon(values)){
            winner = true;
        }

        //Check Horizontal Wins
        values = [];
        for(let i = 0; i < 3; i++){
            values[i] = "";

            for(let j = 0; j < 3; j++){
                values[i] += (board[i][j].getValue());
            }
        }
        if(hasWon(values)){
            winner = true;
        }

        //Check Diagonal Wins
        values = [];
        values[0] = "";

        for(let i = 0; i < 3; i++){

            values[0] += (board[i][i].getValue());
        }
        if(hasWon(values)){
            winner = true;
        }

        //Check Other Diagonal Win
        values = [];
        values[0] = "";

        for(let i = 0; i < 3; i++){

            values[0] += (board[i][2-i].getValue());
        }
        if(hasWon(values)){
            winner = true;
        }


        function hasWon(values){
            for(let i = 0; i < values.length; i++){
                if(values[i][0] == values[i][1] && values[i][0] == values[i][2] && values[i][0] != " "){
                    return true;
                }
            }
            return false;
        }



        return winner;
    }
}



consoleGame();