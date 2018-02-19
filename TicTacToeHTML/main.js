import Game from "./tictactoe.js";

const tttRootElement = document.querySelector('.container');

window.onload = ()=>{
    console.log(tttRootElement);
    let ttt = new Game(tttRootElement);
    let ttt2 = new Game(tttRootElement);
};