function gameBoard(){
    const board = [];
    
    const printBoard = () => {
        board.forEach((x) => {
            console.log(
                `[${x[0].getValue() ?? " "}] [${x[1].getValue() ?? " "}] [${x[2].getValue() ?? " "}]`
            );
            console.log("\n");
        })
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

    }

    const boardFull = () => {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if(board[i][j].getValue() == undefined){
                    return false;
                }
            }
        }
        return true;
    }

    const setBoard = (row, col, newValue) => {
        if (!validMove(row, col) || board[row][col].getValue() != undefined){
            return -1;
        }
        board[row][col].setValue(newValue);
    }

    const getBoard = (row, col) => {
        if (!validMove(row, col)){
            return -1;
        }
        return board[row][col].getValue();
    }

    const validMove = (row, col) => {
        if (row > 2 || col > 2){
            return false;
        } else if (row < 0 || col < 0){
            return false;
        }
        
        return true;
    }

    const resetBoard = function(){
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                board.pop()

            }
        }

        for (let i = 0; i < 3; i++){
            board.push([]);
            for (let j = 0; j < 3; j++){
                board[i].push(cell());
            }
        }
    }



    for (let i = 0; i < 3; i++){
        board.push([]);
        for (let j = 0; j < 3; j++){
            board[i].push(cell());
        }
    }

    

    return {printBoard, getBoard, setBoard, boardFull, resetBoard};
}



function cell(){
    let value;

    const getValue = () => {
        return value;
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
    let bot = false;


    const getName = () => {
        return name;
    }
    const getMarker = () => {
        return marker;
    }

    const setName = (newName) => {
        name = newName;
    }

    const isBot = () => {
        return bot;
    }

    const toggleBot = () => {
        bot = !bot;
    }

    return {setName,getName, getMarker, isBot, toggleBot};
}



function checkWin(game){
    let winner = false;

    //Check Vertical Wins
    let values = [];
    for(let i = 0; i < 3; i++){
        values[i] = "";
        
        for(let j = 0; j < 3; j++){
            values[i] += game.getBoard(j,i) == undefined ? " " : game.getBoard(j,i);

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
            values[i] += game.getBoard(i,j) == undefined ? " " : game.getBoard(i,j);
        }
    }
    if(hasWon(values)){
        winner = true;
    }

    //Check Diagonal Wins
    values = [];
    values[0] = "";

    for(let i = 0; i < 3; i++){
        values[0] += game.getBoard(i,i) == undefined ? " " : game.getBoard(i,i);
    }
    if(hasWon(values)){
        winner = true;
    }

    //Check Other Diagonal Win
    values = [];
    values[0] = "";

    for(let i = 0; i < 3; i++){

        values[0] += game.getBoard(i,2-i) == undefined ? " " : game.getBoard(i,2-i);
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


function consoleGame(){
    const game = gameBoard();


    const player1 = player("Player1", "X");
    const player2 = player("Player2", "O");

    let playerTurn = player1;

    // player1.setName(prompt("Please enter a name for Player 1"));
    // player2.setName(prompt("Please enter a name for Player 2"));


    const gameMode = parseInt(prompt("Gamemode \n(1) player vs player \n(2)  player vs bot \n(3) bot vs bot"));

    if(gameMode == 1){
        let player1Name;
        let player2Name;

        do{
            player1Name = prompt("Player1 Name");
        } while (player1Name == undefined)
        do{
            player2Name = prompt("Player2 Name");
        } while (player2Name == undefined)
        player1.setName(player1Name);
        player2.setName(player2Name);

    } else if(gameMode == 2){
        let player1Name;

        do{
            player1Name = prompt("Player1 Name");
        } while (player1Name == undefined)
        player1.setName(player1Name);

    } else if(gameMode == 3) {
        console.log("Bot match");
    } else {
        return;
    }

    while(true){        

        console.log(playerTurn.getName() + "'s Turn to place " + playerTurn.getMarker());

        if (playerTurn == player1){

            if (gameMode == 3){
                do {
                    const row = Math.floor(Math.random() * 3);
                    const column = Math.floor(Math.random() * 3);
                    if (game.setBoard(row,column, playerTurn.getMarker()) != -1){
                        break;
                    };
                } while(true);
            } else {
                do {
                    const row = prompt("row")
                    const column = prompt("col")
                    if (game.setBoard(row,column, playerTurn.getMarker()) != -1){
                        break;
                    };
                } while(true);
            }
            
        }
        else if (playerTurn == player2) {
            if (gameMode == 1){
                do {
                    const row = prompt("row")
                    const column = prompt("col")
                    if (game.setBoard(row,column, playerTurn.getMarker()) != -1){
                        break;
                    };
                } while(true);
            } else {
                do {
                    const row = Math.floor(Math.random() * 3);
                    const column = Math.floor(Math.random() * 3);
                    if (game.setBoard(row,column, playerTurn.getMarker()) != -1){
                        break;
                    };
                } while(true);
            }


            
        }
        game.printBoard();

        if (checkWin(game)){
            console.log(playerTurn.getName() + " HAS WON THE GAME!");
            break;
        } else if(game.boardFull()){
            console.log("TIE");
            break;
        }
        playerTurn = playerTurn === player1 ? player2 : player1;
    }


    


}



const ScreenController = function(){
    let gameMode; 

    const game = gameBoard();
    const player1 = player("Player1", "X");
    const player2 = player("Player2", "O");
    let playerTurn = player1;
    let winner;

    const board = document.getElementById("board");
    const gamemodes = document.getElementById("gamemodes")
    const restart = document.getElementById("restart");

    restart.addEventListener("click", ()=>{
        resetGame();
    })

    const resetGame  = function(){
        gameMode = undefined;

        game.resetBoard();
        playerTurn = player1;
        winner = undefined;



        restart.classList.add("disabled"); //disable

        gamemodes.classList.remove("disabled"); //enable
        board.classList.add("disabled"); //disable

        // Reset player bots if they were set
        if (player1.isBot()) player1.toggleBot();
        if (player2.isBot()) player2.toggleBot();

    }

    //Gamemode selector
    const gamemodeSelector = () => {
        const buttons = document.querySelectorAll("#gamemodes button");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                gameMode = button.getAttribute("id");
                console.log(gameMode);
                gamemodes.classList.add("disabled"); //disable
                board.classList.remove("disabled"); //enable
    
                //Create bots
                if(gameMode == "pvb"){
                    player2.toggleBot();
                } else if (gameMode == "bvb"){
                    player1.toggleBot();
                    player2.toggleBot();
                }

                loadBoard();
            })
        })
    }
    

    const nextTurn = function(){
        //updates board
        loadBoard();

        //checks if someone won
        if(checkWin(game)){
            winner = playerTurn;
            console.log(playerTurn.getName() + " WON")
            restart.classList.toggle("disabled");
        } else if(game.boardFull()){
            winner = "Tie";
            console.log("TIE");
            restart.classList.toggle("disabled");
        }


        //switches turn
        playerTurn = playerTurn === player1 ? player2 : player1;

        if(playerTurn.isBot()){
            if(winner){ return }
            do {
                const row = Math.floor(Math.random() * 3);
                const column = Math.floor(Math.random() * 3);
                if (game.setBoard(row,column, playerTurn.getMarker()) != -1){
                    break;
                };
            } while(true);
            nextTurn();
        }

    }
    //Load Board 
    const loadBoard = function(){
        board.innerHTML = "";
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                const box = document.createElement("div");
                box.classList.add("box");
                box.textContent = game.getBoard(i,j);
    
                
                
                box.addEventListener("click", () => {
                    if(winner){ return }
                    game.setBoard(i,j,playerTurn.getMarker())

                    nextTurn();
                });
                
                
    
                board.append(box);
            }
        }
    }


    




    //Game Start
    gamemodeSelector();
}


ScreenController();
//consoleGame();

