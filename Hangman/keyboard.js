export default class Keyboard{

    constructor(game){
        this.listener = this.click.bind(this);
        this.keyboardListener = this.keyboardInput.bind(this);
        this.game = game;
        this.keyboard = document.createElement('div');
        this.keys = Array.from(Array(26).keys());
    }

    init(){
        this.keyboard.classList.add('area');
        this.keyboard.classList.add('area__keyboard');
        this.keys.forEach((key, index) =>{
            key = document.createElement('div');
            this.keys[index] = key;
            key.classList.add('button');
            key.classList.add('button__key');
            key.id = 65+index;
            key.innerHTML = String.fromCharCode(key.id);
            key.addEventListener('click', this.listener,false);
            document.addEventListener('keydown', this.keyboardListener, false);
            this.keyboard.appendChild(key);
        });
    }

    keyboardInput(event){
        console.log();
        if(this.game.focused && event.keyCode === 13){
            this.game.initNewGame();
        }
        else if( this.game.focused &&
            (String.fromCharCode(event.keyCode).toUpperCase()).charCodeAt(0)>= 65 &&
            (String.fromCharCode(event.keyCode).toUpperCase()).charCodeAt(0)<=90 &&
            this.keys[(String.fromCharCode(event.keyCode).toUpperCase()).charCodeAt(0)-65].classList.value.indexOf('button--disabled')<0){
            this.game.replaceLetter(String.fromCharCode(event.keyCode));
            this.disableKey((String.fromCharCode(event.keyCode).toUpperCase()).charCodeAt(0));
        }
    }

    click(event){
        console.log(String.fromCharCode(event.target.id));
        console.log(event);
        this.game.replaceLetter(String.fromCharCode(event.target.id));
        this.disableKey(event.target.id);
    }

    removeAllListeners(){
        console.log('remove listener');
        this.keys.forEach(key =>{
            key.removeEventListener('click', this.listener, false);
            //key.removeEventListener('keypress', this.listener, false);
        });
    }

    disableKey(keyCode){
        document.getElementById(keyCode).removeEventListener('click', this.listener, false);
        //document.getElementById(keyCode).removeEventListener('keypress', this.listener, false);
        document.getElementById(keyCode).classList.add('button--disabled');

    }
    reset(){
        this.keys.forEach((key, index) =>{
            key.classList.remove('button--disabled');
            key.addEventListener('click', this.listener,false);
        });
    }
}