let board;
let currentPlayer;
let cells;
let gameState;
const playerOne = "grid__content--cross-small";
const playerTwo = "grid__content--circle-small";
const playerOneWin = "grid__content--cross-big";
const playerTwoWin = "grid__content--circle-big";
const highlighted = "grid__box--highlight";
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2],
    [0,1,2,3,4,5,6,7,8]
]
function startGame(){
    cells = document.querySelectorAll(".grid__box");
    currentPlayer = playerOne;
    board = Array.from(Array(9).keys());
    document.querySelector("button").innerText = "Play!";
    for(var i = 0; i< cells.length;i++)
    {
        cells[i].classList.remove("grid__box--highlight");
        removeContent(cells[i].querySelector("div"));
        cells[i].addEventListener("click", turn, false);
    }
}

function turn(payload){

    if(payload.target.querySelector("div").classList.length == 0){
        payload.target.querySelector("div").classList.add(currentPlayer);
        board[payload.target.id] = currentPlayer;
        payload.target.querySelector("div").style.pointerEvents = "none";
        let gameWon = checkWin(board, currentPlayer)
        if(gameWon) gameOver(gameWon)
        currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
    }
}

function checkWin(board, player){
    let ticks = board.reduce((result,element,index) =>
        (element===player) ? result.concat(index) : result, []);
    console.log(...ticks);
    let gameWon = null;
    for(let [index, win] of winCombos.entries()){
        if(win.every(elem => ticks.indexOf(elem) > -1))
        {
            gameWon = {index: index, player: player};
        }
    }
    if(board.every(elem => elem===playerOne || elem===playerTwo))
    {
        gameWon = {index: winCombos-length-1, player: undefined};
    }
    return gameWon;
}

function gameOver(gameWon){
    for(let index of winCombos[gameWon.index]){
        document.getElementById(index).classList.add(highlighted);
        removeContent(document.getElementById(index).querySelector("div"));
        addContent(document.getElementById(index).querySelector("div"),
            currentPlayer==playerOne ? playerOneWin : playerTwoWin);
    }
    for(var i = 0; i < cells.length; i++){
        cells[i].removeEventListener("click", turn, false);
    }
    document.querySelector("button").innerText = "Replay!";
    console.log("won");
}

function removeContent(payload){
    payload
        .classList
        .remove("grid__content--circle-big","grid__content--cross-small","grid__content--circle-small", "grid__content--cross-big");
}

function addContent(payload, content){
    payload
        .classList
        .add(content);
}