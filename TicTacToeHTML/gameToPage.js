const GRID_TAG = "grid";
const BOX_TAG = "grid__box";
const CROSS_TAG = "grid__content--cross-small";
const CIRCLE_TAG = "grid__content--circle-small";
const CROSS_BIG_TAG = "grid__content--cross-big";
const CIRCLE_BIG_TAG = "grid__content--circle-big";
const HIGHTLIGHT_TAG = "grid__box--highlight";

export default class gameToPage{

    constructor (tttRootElement, game){
        this.game = game;
        this.tttRootElement = tttRootElement;
        this.gridElement = document.createElement("div");
        this.gridBoxElements = [document.createElement("div"),document.createElement("div"),document.createElement("div"),
                                document.createElement("div"), document.createElement("div"),document.createElement("div"),
                                document.createElement("div"),document.createElement("div"),document.createElement("div")];
        this.gridBoxContentElements = [document.createElement("div"),document.createElement("div"),document.createElement("div"),
                                        document.createElement("div"), document.createElement("div"),document.createElement("div"),
                                        document.createElement("div"),document.createElement("div"),document.createElement("div")];
        this.buttonElement = document.createElement("button");
    }

    setupNewGame(){
        console.log("Create Game on Page");
        //Append content to each gridBox
        //Append each grid Box to grid
        this.gridElement.classList.add(GRID_TAG);
        this.gridBoxElements.forEach((element, index) =>{
            this.gridBoxContentElements[index].style.pointerEvents = "none";
            element.appendChild(this.gridBoxContentElements[index]);
            element.classList.add(BOX_TAG);
            element.id = index;
            this.gridElement.appendChild(element);
        });
        //Append grid to root Element
        this.buttonElement.innerHTML = "New Game";
        this.gridElement.appendChild(this.buttonElement);
        this.tttRootElement.appendChild(this.gridElement);
        this.buttonElement.onclick = ()=>{
            this.game.initNewGame();
        };
        //Append button to root element
        //this.tttRootElement.appendChild(this.buttonElement);
        //this.gridElement.innerHTML = "<button onClick='initNewGame()'>New Game</button>";
    }

    setCross(index){
        this.gridBoxContentElements[index].classList.add(CROSS_TAG);
    }
    setCircle(index){
        this.gridBoxContentElements[index].classList.add(CIRCLE_TAG);
    }
    setHighlight(index){
        this.gridBoxElements[index].classList.add(HIGHTLIGHT_TAG);
    }
    setBigCircle(index){
        this.gridBoxContentElements[index].classList.add(CIRCLE_BIG_TAG);
    }
    setBigCross(index){
        this.gridBoxContentElements[index].classList.add(CROSS_BIG_TAG);
    }

    resetGame(){
        console.log("Reset Game on Page");
        this.gridBoxElements.forEach((element, index) =>{
            element.classList.remove(HIGHTLIGHT_TAG);
            this.gridBoxContentElements[index].className = "";
        });
    }


}