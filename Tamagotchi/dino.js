class Dino{

    constructor(name){
        this.name = name;
        this.hunger = 100;
        this.durst= 100;
        this.sauberkeit = 100;
        this.gesundheit = 100;
        this.events = [];
    }

    load(data){
        this.name = data.name;
        this.hunger = data.hunger;
        this.durst= data.durst;
        this.sauberkeit = data.sauberkeit;
        this.gesundheit = data.gesundheit;
        this.events = data.events;
    }
    getsThirsty(){
        let need=Math.floor(Math.random() * (50 - 10 + 1)) + 10;
        return new Promise((resolve, reject)=>{
            //this.durst-=need;
            setTimeout(function(){
                resolve({value: need, need: "durst" });
            },need*100);
        });
    }
    getsSick(){
        let need=Math.floor(Math.random() * (50 - 10 + 1)) + 10;
        return new Promise((resolve, reject)=>{
            //console.log("getsSick");
            //this.gesundheit-=need;
            setTimeout(function(){
                resolve({value: need, need: "gesundheit" });
            },need*100);
        });
    }
    getsDirty(){
        let need=Math.floor(Math.random() * (50 - 10 + 1)) + 10;
        return new Promise((resolve, reject)=>{
            //console.log("getsDirty");
            //this.sauberkeit-=need;
            setTimeout(function(){
                resolve({value: need, need: "sauberkeit" });
            },need*100);

        });
    }
    getsHungry(){
        let need=Math.floor(Math.random() * (50 - 10 + 1)) + 10;
        return new Promise((resolve, reject)=>{
            //console.log("getsHungry");
            //this.hunger-=need;
            setTimeout(function(){
                resolve({value: need, need: "hunger" });
            },need*100);
        });
    }
    _feed(){
        this.hunger = 100;
    }
    _drink(){
        this.durst = 100;
    }
    _clean(){
        this.sauberkeit = 100;
    }
    _heal(){
        this.gesundheit = 100;
    }
    checkIfDead(){
        if(this.sauberkeit <= 0 ||this.hunger <= 0 || this.durst <= 0 || this.gesundheit <= 0){
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