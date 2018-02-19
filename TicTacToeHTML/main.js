import Game from "./tictactoe.js";

const tttRootElement = document.querySelector('.container');

window.onload = ()=>{
    console.log(tttRootElement);
    createGame();
    createGame();

};

function createGame(){
    let game = new Game(tttRootElement);
    game.gameToPage.gridBoxElements.forEach((element, index) =>{
        element.addEventListener("click", click, false);
    });
    function click(payload){
        game.act(parseInt(payload.target.id));
    }
}

