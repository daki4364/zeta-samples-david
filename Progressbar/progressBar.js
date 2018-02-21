function ProgressBar(){
    this.rootElement = document.querySelector('.container'),
    this.progressBarFill = document.createElement('div'),
    this.progressBar = document.createElement('div'),
    this.progressBarText = document.createElement('h1'),
    this.currentFillPercentage = 0
}

ProgressBar.prototype.setup = function(){
    this.progressBarFill.classList.add("progressBar__fill");
    this.progressBarText.classList.add("progressBar__text");
    this.progressBarText.innerHTML = "0%";
    this.progressBar.classList.add("progressBar");

    this.progressBar.appendChild(this.progressBarFill);
    this.progressBar.appendChild(this.progressBarText);
    this.rootElement.appendChild(this.progressBar);
    this.progressBar.addEventListener('click', this.click.bind(this), false);

    this.progressBarFill.style.right = "100%";
};

ProgressBar.prototype.fillAnimation = function(fillPercentage) {
    this.progressBarText.innerHTML = fillPercentage+"%";
    let keyframes =[
        {
            transform: `translateX(${this.currentFillPercentage}%)`
        },
        {
            transform: `translateX(${fillPercentage}%)`
        }
    ];
    this.progressBarFill.animate(keyframes, {duration: 500, fill: 'forwards', easing:'ease-in'});
    this.currentFillPercentage = fillPercentage;
};

ProgressBar.prototype.click = function (payload) {

    let elementWidth = payload.target.getBoundingClientRect().width;
    let clickOffX = payload.offsetX;
    let fillPercent = Math.round((100/elementWidth)*clickOffX);
    //console.log(fillPercent);
    this.fillAnimation(fillPercent);
};

let progressBar = new ProgressBar();
progressBar.setup();

let progressBar2 = new ProgressBar();

progressBar2.setup();
