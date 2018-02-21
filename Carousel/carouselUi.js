export default class CarouselUi {

    constructor(rootElement, pictures,width, height){
        this.rootElement = rootElement;
        this.picIndex = 0;
        this.carouselWidth = width;
        this.carouselHeight = height;
        this.buttonLeft = {element: document.createElement("div"), visible: false};
        this.buttonRight = {element: document.createElement("div"), visible: true};
        this.window = document.createElement("div");
        this.pictureStripe = document.createElement("div");
        this.pictures = pictures;

        this.urls = this.pictures.reduce((acc,pic)=> acc.concat(`url(${pic})`),[]).join(", ");
        this.imgPositions = this.pictures.reduce((acc,pic,index)=> acc.concat(`left ${index*this.carouselWidth}vmin top 0`),[]).join(", ");
    }

    setup(){
        this.pictureStripe.classList.add('pictureStripe');
        this.buttonLeft.element.classList.add('buttonLeft');
        this.buttonRight.element.classList.add('buttonRight');
        this.window.classList.add('window');
        this.window.style.width = `${this.carouselWidth}vmin`;
        this.window.style.height = `${this.carouselHeight}vmin`;
        this.pictureStripe.style.backgroundPosition = this.imgPositions;
        this.pictureStripe.style.width = `${this.pictures.length*100}%`;
        this.pictureStripe.style.backgroundImage = this.urls;
        this.window.appendChild(this.pictureStripe);
        this.window.appendChild(this.buttonLeft.element);
        this.window.appendChild(this.buttonRight.element);
        this.rootElement.appendChild(this.window);
    }

    checkButtons(){
        if(this.buttonLeft.visible === false){
            this.buttonLeft.element.id = 'fadeOut';
            //this.buttonLeft.element.style.visibility = 'hidden';
            this.buttonLeft.element.style.pointerEvents = 'none';
        }
        else{
            this.buttonLeft.element.id = '';
            //this.buttonLeft.element.style.visibility = 'visible';
            this.buttonLeft.element.style.pointerEvents = 'initial';
        }
        if(this.buttonRight.visible === false){
            this.buttonRight.element.id = 'fadeOut';
            //this.buttonRight.element.style.visibility = 'hidden';
            this.buttonRight.element.style.pointerEvents = 'none';
        }
        else{
            this.buttonRight.element.id = '';
            //this.buttonRight.element.style.visibility = 'visible';
            this.buttonRight.element.style.pointerEvents = 'initial';
        }
    }

    movePicture(direction){
        let initialX =(this.picIndex*this.carouselWidth)*-1;
        let newX = direction === 'left' ? ((this.picIndex+1)*this.carouselWidth)*-1 : ((this.picIndex-1)*this.carouselWidth)*-1
        this.picIndex = direction === 'left' ? this.picIndex+1 : this.picIndex-1;
        let keyframes =[
            {
                transform: `translateX(${initialX}vmin)`
            },
            {
                transform: `translateX(${newX}vmin)`
            }
        ];
        this.pictureStripe.animate(keyframes, {duration: 500, fill: 'forwards', easing:'ease-in'});
        if(this.picIndex === 0){
            this.buttonRight.visible = true;
            this.buttonLeft.visible = false;
        }
        else if(this.picIndex === this.pictures.length-1){
            this.buttonRight.visible = false;
            this.buttonLeft.visible = true;
        }
        else{
            this.buttonRight.visible = true;
            this.buttonLeft.visible = true;
        }




    }

    moveAnimation(){

    }

}