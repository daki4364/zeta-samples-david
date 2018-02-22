class EventCircle{

    constructor(rootElement){
        this.wait = 0;
        this.rootElement = rootElement;
        this.circles = [document.createElement('div'),
                        document.createElement('div'),
                        document.createElement('div'),
                        document.createElement('div'),
                        document.createElement('div'),
                        document.createElement('div'),
                        document.createElement('div'),
                        document.createElement('div')];
    }

    setup(){
        this.circles.forEach((circle, index) =>{
            circle.addEventListener('click', this.capture.bind(this),true);
            circle.addEventListener('click', this.bubble.bind(this),false);
            circle.classList.add('circle');
            circle.id = index;
            if(index%2===0){
                circle.classList.add('circle__dark');
            }
            else{
                circle.classList.add('circle__light');
            }
            if(index === 0){
                this.rootElement.appendChild(circle);
            }
            else{
                this.circles[index-1].appendChild(circle);
            }
        });
    }

    bubble(payload){
        let element = payload.currentTarget;
        this.animate(element, 'circle--bubble');

    }

    capture(payload){
        let element = payload.currentTarget;
        this.animate(element, 'circle--capture');

    }

    animate(element,clazz){
        this.wait++;
        let multiply = clazz === 'circle--capture' ? element.id : this.wait;
        console.log("wait: "+this.wait);
        console.log("id "+element.id);
        setTimeout(()=> {
            element.classList.toggle(clazz);
            console.log("add " + clazz);
            setTimeout(()=>{
                element.classList.toggle(clazz);
                console.log("remove " + clazz);
                this.wait = element.id
            },300);
        },multiply*300);
    }
}

let circle = new EventCircle(document.querySelector('.container'));
circle.setup();