import CarouselUi from './carouselUi.js';

class Carousel {

    constructor(rootElement, pictures){
        this.ui = new CarouselUi(rootElement,pictures,80, 40);
    }

    setup(){
        this.ui.setup();
        this.ui.checkButtons();
        this.ui.buttonLeft.element.addEventListener('click', this.click.bind(this), false);
        this.ui.buttonRight.element.addEventListener('click', this.click.bind(this), false);
    }

    click(payload){
        if(payload.target.className === 'buttonRight'){
            console.log("move pics to left");
            this.ui.movePicture('left');
        }
        if(payload.target.className === 'buttonLeft'){
            console.log("move pics to right");
            this.ui.movePicture('right');
        }
        this.ui.checkButtons();
    }

}

let car = new Carousel(document.querySelector('.container'), ["./res/guitar1.jpg","./res/guitar2.jpg","./res/guitar3.jpg","./res/guitar4.jpg"]);
car.setup();
let car2 = new Carousel(document.querySelector('.container'), ["./res/guitar1.jpg","./res/guitar2.jpg","./res/guitar3.jpg","./res/guitar4.jpg"]);
car2.setup();

