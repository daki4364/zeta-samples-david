class Dino{

    constructor(name){
        this.name = name;
        this.hunger = 100;
        this.durst= 100;
        this.sauberkeit = 100;
        this.gesundheit = 100;
    }

    load(data){
        this.name = data.name;
        this.hunger = data.hunger;
        this.durst= data.durst;
        this.sauberkeit = data.sauberkeit;
        this.gesundheit = data.gesundheit;
    }
    _gameLoop(){
        return new Promise((resolve, reject)=>{
            this._getsHungry();
            while(this.checkIfDead()){

            }
            resolve(true);
        });
    }

    _getsHungry(){
        new Promise((resolve, reject)=>{
            console.log(this.checkIfDead());
            setTimeout(function(){
                console.log("gets hungry now");
            },1000);
            resolve(true);
        }).then((data)=>{console.log("DEAD")});
    }

    checkIfDead(){
        if(this.hunger <=0 ||this.durst <=0 ||this.sauberkeit <=0 ||this.gesundheit <=0){
            return true;
        }
        else{
            return false;
        }
    }

    toJson(){
        return JSON.stringify(this);
    }
}

module.exports.Dino = Dino;