import Keyboard from './keyboard.js';

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

export default class Game{

    constructor(rootElement){
        this.rootElement = rootElement;
        this.database = ["Text","Axt","Dettelbach", "Gitarre"];
        this.currentWord = "";
        this.currentTries = 0;
        this.gameState = 'open';
        this.game = document.createElement('div');
        this.stateArea = document.createElement('div');
        this.stateAreaText = document.createElement('div');
        this.resultArea = document.createElement('div');
        this.restartButton = document.createElement('div');
        this.contentArea = document.createElement('div');
        this.keyboard = new Keyboard(this);
    }

    start(){
        //this.loadDatabase('database.json');
        this.keyboard.init();
        this.restartButton.innerHTML = 'New Game';

        this.game.classList.add('game');

        this.stateArea.classList.add('area');
        this.stateArea.classList.add('area__state');

        this.stateAreaText.classList.add('area__text');

        this.resultArea.classList.add('area');
        this.resultArea.classList.add('area__result');

        this.resultArea.classList.add('area__text');

        this.restartButton.classList.add('area');
        this.restartButton.classList.add('area__text');
        this.restartButton.classList.add('button');
        this.restartButton.classList.add('button__restart');
        this.restartButton.addEventListener('click', this.initNewGame.bind(this));

        this.restartButton.classList.add('area__text');

        this.contentArea.classList.add('area');
        this.contentArea.classList.add('area__content');

        this.stateArea.appendChild(this.stateAreaText);

        this.game.appendChild(this.stateArea);
        this.game.appendChild(this.resultArea);
        this.game.appendChild(this.restartButton);
        this.game.appendChild(this.contentArea);
        this.game.appendChild(this.keyboard.keyboard);

        this.rootElement.appendChild(this.game);
        this.initNewGame();
    }

    initNewGame(){
        this.gameState = 'open';
        this.keyboard.reset();
        this.stateAreaText.innerHTML = 'Active Game';
        this.stateAreaText.style.color = 'black';
        this.stateAreaText.classList.remove('area__text--blink');

        this.currentTries = 0;
        this.updateResult();
        this.initContent(Math.floor(Math.random() * (this.database.length-1)) + 0 );
    }

    initContent(wordIndex) {
        this.currentWord = this.database[wordIndex].toUpperCase();
        this.contentArea.innerHTML = '_ '.repeat(this.currentWord.length);
    }

    replaceLetter(letter){
        letter = letter.toUpperCase();
        if(this.currentWord.indexOf(letter)>=0){
            let indices = [];
            for(let i = 0; i< this.currentWord.length; i++){
                if(this.currentWord[i] === letter)
                {
                    indices.push(i);
                }
            }
            console.log(indices);
            indices.forEach(i =>{
                let oldWord = this.contentArea.innerText.replace( /\s/g, "");
                this.contentArea.innerText = oldWord.replaceAt(i,letter).split('').join(' ');
                console.log(oldWord);
            });
        }
        else{
            this.currentTries++;
            this.updateResult();
        }
        this.checkWin();
    }

    checkWin(){
        if(this.contentArea.innerText.replace( /\s/g, "") === this.currentWord && this.currentTries<=10){
            console.log('won');
            this.gameState = 'won';
            this.keyboard.removeAllListeners();
            this.setWin();
        }
        else if(this.contentArea.innerText.replace( /\s/g, "") !== this.currentWord && this.currentTries>=10){
            console.log('fail');
            this.gameState = 'fail';
            this.keyboard.removeAllListeners();
            this.contentArea.innerHTML = this.currentWord;
            this.setFail();
        }
    }

    updateResult(){
        this.resultArea.innerHTML = `Fails: ${this.currentTries}/10`;
        this.resultArea.style.backgroundColor = `rgba(255,0,0,${this.currentTries/10})`;
    }

    setWin(){
        this.stateAreaText.innerHTML = 'Win';
        this.stateAreaText.style.color = 'green';
        this.stateAreaText.classList.add('area__text--blink');
    }

    setFail(){
        this.stateAreaText.innerHTML = 'Fail';
        this.stateAreaText.style.color = 'red';
        this.stateAreaText.classList.add('area__text--blink');

    }

    loadDatabase(filePath){
        new Promise((resolve, reject)=>{
            fs.readFile(filePath,(err, data) => {
                if (err){
                    //console.log("loading file rejected");
                    reject(err);
                }
                else {
                    //console.log("loading file resolved");
                    resolve(JSON.parse(data));
                }
            })
        }).then((data) => {
            this.database = data.words;
            console.log(this.database);
        })
            .catch((err)=> {throw err});
    }
}