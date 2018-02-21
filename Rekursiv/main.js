class Box {
    constructor(rootElement){
        this.rootElement = rootElement;
        this.element = document.createElement('div');
        this.element.classList.add('box');
        this.element.addEventListener('click', click);
    }
}
document.querySelector('.container').addEventListener('click', click);
window.addEventListener('resize', function (event) {
    resetPage();
});

function resetPage(){
    document.querySelector('.container').innerHTML = "";
    document.querySelector('.container').addEventListener('click', click);
}

function click(payload){
    let box = new Box(payload.target).element;
    payload.target.appendChild(box);
    let padding = parseFloat(window.getComputedStyle(payload.target).getPropertyValue('padding'));
    let width = Math.round(parseInt(payload.target.getBoundingClientRect().width)-(4*padding));
    let height = Math.round(parseInt(payload.target.getBoundingClientRect().height)-(4*padding));
    console.log(width);
    console.log(height);
    if(width <= 0 || height <= 0){
        resetPage();
    }
    payload.target.removeEventListener('click', click);
}
