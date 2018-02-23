import Keyboard from './keyboard.js';

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

export default class Game{

    constructor(rootElement){
        this.rootElement = rootElement;
        this.database = 'http://krautipsum.com/api/noun';
        this.currentWord = "";
        this.currentTries = 0;
        this.gameState = 'open';
        this.focused = false;
        this.game = document.createElement('div');
        this.stateArea = document.createElement('div');
        this.stateAreaText = document.createElement('div');
        this.resultArea = document.createElement('div');
        this.restartButton = document.createElement('div');
        this.contentArea = document.createElement('div');
        this.failArea = document.createElement('div');
        this.keyboard = new Keyboard(this);
    }

    start(){
        this.keyboard.init();
        this.restartButton.innerHTML = 'New Game';

        this.game.classList.add('game');

        this.stateArea.classList.add('area');
        this.stateArea.classList.add('area__state');

        this.stateAreaText.classList.add('area__text');

        this.resultArea.classList.add('area');
        this.resultArea.classList.add('area__result');

        this.resultArea.classList.add('area__text');

        this.failArea.classList.add('area__fail');

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
        this.game.appendChild(this.failArea);
        this.rootElement.appendChild(this.game);

        this.game.onmouseover = ()=>{this.focused = true};
        this.game.onmouseleave = ()=>{this.focused = false};
        this.initNewGame();
    }

    initNewGame(){
        this.keyboard.removeAllListeners();
        this.gameState = 'open';
        this.keyboard.reset();
        this.stateAreaText.innerHTML = 'Active Game';
        this.stateAreaText.style.color = 'white';
        this.stateAreaText.classList.remove('area__text--blink');
        this.currentTries = 0;
        this.updateResult();
        this.loadDatabase(this.database);
    }

    initContent() {
        this.contentArea.innerHTML = '_ '.repeat(this.currentWord.length);
        console.log(this.currentWord);
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
            indices.forEach(i =>{
                let oldWord = this.contentArea.innerText.replace( /\s/g, "");
                this.contentArea.innerText = oldWord.replaceAt(i,letter).split('').join(' ');
                //console.log(oldWord);
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
        this.failArea.style.opacity = `${this.currentTries/25}`;
        if(this.currentTries>0){
            this.game.classList.toggle('game--fail');
            setTimeout(()=>{ this.game.classList.toggle('game--fail');},200);
        }

    }

    setWin(){
        this.stateAreaText.innerHTML = 'Win';
        this.stateAreaText.style.color = 'green';
        this.stateAreaText.classList.add('area__text--blink');
    }

    setFail(){
        this.stateAreaText.innerHTML = 'Fail';
        this.stateAreaText.style.color = 'yellow';
        this.stateAreaText.classList.add('area__text--blink');

    }

    loadDatabase(filePath){
        fetch(filePath)
            .then(data => data.json())
            .then((data)=>{
                this.currentWord = this.prepareData(data.noun);
                this.initContent();
            })
            .catch(err => {throw err});
    }

    prepareData(data){
        let word = data.toUpperCase().split('').join(' ');
        if(word.indexOf('Ä')>=0){
            let indices = [];
            for(let i = 0; i< word.length; i++){
                if(word[i] === 'Ä')
                {
                    indices.push(i);
                }
            }
            indices.forEach(i =>{word = word.replaceAt(i,'AE');});
        }
        if(word.indexOf('Ü')>=0){
            let indices = [];
            for(let i = 0; i< word.length; i++){
                if(word[i] === 'Ü')
                {
                    indices.push(i);
                }
            }
            indices.forEach(i =>{word = word.replaceAt(i,'UE');});
        }
        if(word.indexOf('Ö')>=0){
            let indices = [];
            for(let i = 0; i< word.length; i++){
                if(word[i] === 'Ö')
                {
                    indices.push(i);
                }
            }
            indices.forEach(i =>{word = word.replaceAt(i,'OE');});
        }
        return word.replace( /\s/g, "")+"";
    }
}