export default class Keyboard{

    constructor(game){
        this.listener = this.click.bind(this);
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
            this.keyboard.appendChild(key);
        });
    }

    click(event){
        console.log(String.fromCharCode(event.target.id));
        this.game.replaceLetter(String.fromCharCode(event.target.id));
        this.disableKey(event.target.id);
    }

    removeAllListeners(){
        console.log('remove listener');
        this.keys.forEach(key =>{
            key.removeEventListener('click', this.listener, false);
        });
    }

    disableKey(keyCode){
        document.getElementById(keyCode).removeEventListener('click', this.listener, false);
        document.getElementById(keyCode).classList.add('button--disabled');

    }
    reset(){
        this.keys.forEach((key, index) =>{
            key.classList.remove('button--disabled');
            key.addEventListener('click', this.listener,false);
        });
    }
}