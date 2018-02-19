const GRID_TAG = "grid";
const BOX_TAG = "grid__box";
const PLAYER_1_TAG = "grid__content--cross-small";
const PLAYER_2_TAG = "grid__content--circle-small";
const PLAYER_1_WIN_TAG = "grid__content--cross-big";
const PLAYER_2_WIN_TAG = "grid__content--circle-big";
const HIGHTLIGHT_TAG = "grid__box--highlight";

export default class gameToPage{

    constructor (tttRootElement){
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
        //Append content to each gridBox
        //Append each grid Box to grid
        this.gridElement.classList.add(GRID_TAG);
        this.gridBoxElements.forEach((element, index) =>{
            element.appendChild(this.gridBoxContentElements[index]);
            element.classList.add(BOX_TAG);
            element.id = index;
            this.gridElement.appendChild(element);
        });
        //Append grid to root Element
        this.gridElement.appendChild(this.buttonElement);
        this.tttRootElement.appendChild(this.gridElement);
        //Append button to root element
        //this.tttRootElement.appendChild(this.buttonElement);
    }
}