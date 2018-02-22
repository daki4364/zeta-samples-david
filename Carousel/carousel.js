import CarouselUi from './carouselUi.js';

class Carousel {

    constructor(rootElement, pictures, draggable){
        this.ui = new CarouselUi(rootElement,pictures,80, 40);
        this.draggable = draggable;
    }

    setup(){
        this.ui.setup();

        if(this.draggable){
            //this.ui.window.setAttribute('draggable', true);

            this.ui.window.addEventListener('pointerup', this.drop.bind(this));
            this.ui.window.addEventListener('pointerdown', this.drag.bind(this));
            this.ui.window.addEventListener('pointercancel', function () {
                console.log("cancel");
            });
            this.ui.buttonRight.visible = false;
        }
        else{
            this.ui.buttonLeft.element.addEventListener('click', this.click.bind(this), false);
            this.ui.buttonRight.element.addEventListener('click', this.click.bind(this), false);

        }
        this.ui.checkButtons();


    }

    click(payload){
        if(payload.target.className === 'buttonRight'){
            this.ui.movePicture('left');
        }
        if(payload.target.className === 'buttonLeft'){
            this.ui.movePicture('right');
        }
        this.ui.checkButtons();
    }

    drop(payload){
        payload.preventDefault();
        console.log(payload.offsetX);
        if(payload.offsetX >= parseInt(this.ui.window.getBoundingClientRect().width)){
            if(this.ui.picIndex>0){
                this.ui.movePicture('right');
            }

        }
        else if(payload.offsetX <= 0){
            if(this.ui.picIndex<this.ui.pictures.length-1){
                this.ui.movePicture('left');
            }

        }

    }
    drag(payload){
        this.ui.window.setPointerCapture(payload.pointerId);
        payload.preventDefault();
        console.log(payload.pointerId);
        //let dragIcon = document.createElement('img');
        //payload.dataTransfer.setDragImage(dragIcon,-10,-10);
    }
}

let car = new Carousel(document.querySelector('.container'), ["./res/guitar1.jpg","./res/guitar2.jpg","./res/guitar3.jpg","./res/guitar4.jpg"],false);
car.setup();

let car2 = new Carousel(document.querySelector('.container'), ["./res/guitar1.jpg","./res/guitar2.jpg","./res/guitar3.jpg","./res/guitar4.jpg"],true);
car2.setup();
