export default class Pong{
    constructor(){
        this.playerOne = {  element: document.querySelector('.player__one'),
                            position: parseInt(document.querySelector('.player__one').clientTop)};
        this.playerTwo = {  element: document.querySelector('.player__two'),
                            position: parseInt(document.querySelector('.player__two').clientTop)};
        this.windowHeight = Math.floor(document.querySelector('.container').getBoundingClientRect().height);
        this.speed = 15;
        this.ball = {   element: document.querySelector('.ball'),
                        gravitation: 9,
                        bounce: 10,
                        position: parseInt(document.querySelector('.ball').clientTop)};
        window.onkeydown = this.inputDown.bind(this);
        setInterval(()=>{
            this.physicsStep();
        },1000/30);
    }

    playerMove(direction){

        direction = direction.toLowerCase().trim();
        if(direction==='down'){
            this.playerOne.position+= this.speed;

            this.playerOne.element.style.transform = `translateY(${this.playerOne.position}px)`;
        }
        else if(direction ==='up'){
            this.playerOne.position-= this.speed;

            this.playerOne.element.style.transform = `translateY(${this.playerOne.position}px)`;
        }
        console.log(this.windowHeight);
        console.log(Math.floor(this.playerOne.element.getBoundingClientRect().top));
        console.log(Math.floor(this.playerOne.element.getBoundingClientRect().bottom) );
    }

    opponentMove(direction){
        direction = direction.toLowerCase().trim();
        if(direction==='down'){
            this.playerTwo.position+= this.speed;

            this.playerTwo.element.style.transform = `translateY(${this.playerTwo.position}px)`;
        }
        else if(direction ==='up'){
            this.playerOne.position-= this.speed;

            this.playerTwo.element.style.transform = `translateY(${this.playerTwo.position}px)`;
        }
    }

    inputDown(key){
        console.log("key press");
        key = key || window.event;
        if (key.keyCode == '38') {
            //this.playerOne.element.style.transform = `translateY(-${this.playerOne.position}vmin)`;
            if(Math.floor(this.playerOne.element.getBoundingClientRect().top)-this.speed > 0){
                this.playerMove('up');
            }
        }
        else if (key.keyCode == '40') {
            // down arrow
            if(Math.floor(this.playerOne.element.getBoundingClientRect().bottom)+this.speed < this.windowHeight){
                this.playerMove('down');
            }
        }
    }

    collisionWall(){
        if(Math.floor(this.ball.element.getBoundingClientRect().top)-this.ball.gravitation > 0){

        }
        else{
            return 'top';
        }
        if(Math.floor(this.ball.element.getBoundingClientRect().bottom)+this.ball.gravitation < this.windowHeight){

        }
        else{
            return 'bottom';
        }
    }

    physicsStep(){
        if(this.collisionWall()!=='bottom'){
            this.ball.position+= this.ball.gravitation;
            this.ball.element.style.transform = `translateY(${this.ball.position}px)`;
        }
        if(this.collisionWall()==='bottom'){
            //console.log("bounce");
        }

    }

}