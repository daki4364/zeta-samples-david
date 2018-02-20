function ProgressBar(){
    this.rootElement = document.querySelector('.container'),
    this.progressBarFill = document.createElement('div'),
    this.progressBar = document.createElement('div'),
    this.progressBarText = document.createElement('h1')
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

ProgressBar.prototype.click = function (payload) {

    let elementWidth = payload.target.getBoundingClientRect().width;
    let elementHeight = payload.target.getBoundingClientRect().height;
    let clickOffX = payload.offsetX;
    let offPercent = Math.round((100/elementWidth)*clickOffX);
    let offResult = 100-offPercent;
    this.progressBarText.innerHTML = offPercent+"%";
    console.log(offPercent);
    this.progressBarFill.style.right = offResult+"%";
};

let progressBar = new ProgressBar();
console.log(progressBar);
progressBar.setup();