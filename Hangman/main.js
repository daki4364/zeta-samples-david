import Game from './game.js';

let root = document.querySelector('.container');

let game = new Game(root);
game.start();

let game2 = new Game(root);
game2.start();