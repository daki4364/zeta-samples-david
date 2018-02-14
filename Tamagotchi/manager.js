const dino = require('./dino.js');
const printer = require('./printer.js');
const fs = require("fs");

class Game{

    constructor(filePath){
        this.autoSave = false;
        this.funcs = ["_getsHungry","_getsThirsty","_getsDirty","_getsSick"];
        this.gameState = "stop";
        this.filePath = filePath.toLowerCase();
        this.dino = new dino.Dino(this.filePath.split('.')[0]);
        fs.exists(this.filePath, (exists)=>{
            if(exists){
                //console.log(this.filePath + " exists. Load game file");
                this._loadSaveFile(this.filePath);
            }
            else{
                //console.log(this.filePath + " does not exists. Create game file");
                this._createSaveFile(this.filePath,this.dino.toJson())
                    .then((data)=>{if(data)this._loadSaveFile(this.filePath);})
                    .catch((err)=> {throw err;});
            }

        });

    }
    _loadSaveFile(filePath){
        new Promise((resolve, reject)=>{
            console.log(printer._getCurrentTime()+"Load game file...");
            fs.readFile(filePath,(err, data) => {
                if (err){
                    //console.log("loading file rejected");
                    reject(err);
                }
                else {
                    //console.log("loading file resolved");
                    resolve(JSON.parse(data));
                }
            })
        }).then((data) => {
            this.dino.load(data);
            if(this.dino.checkIfDead()){
                this._gameOver();
            }
            else{
                console.log(printer._getCurrentTime()+"Input 'START' to start the game!");
            }
        })
            .catch((err)=> {throw err});
    }
    _createSaveFile(filePath,data){
        return new Promise((resolve, reject)=>{
            console.log(printer._getCurrentTime()+"Create new game file...");
            fs.writeFile(filePath,data,(err) => {
                if (err){
                    //console.log("create game file rejected");
                    reject(err);
                }
                else {
                    //console.log("create game file resolved");
                    resolve(true);
                }
            })
        });
    }

    _saveGame(){
        return new Promise((resolve, reject)=>{
            console.log(printer._getCurrentTime()+"Saving game...");
            fs.writeFile(this.filePath,this.dino.toJson(),(err) => {
                if (err){
                    //console.log("saving game rejected");
                    reject(err);
                }
                else {
                    //console.log("saving game resolved");
                    resolve(true);
                }
            })
        });
    }
    _stopGame(){
        this.gameState = "stop";
        console.log(printer._getCurrentTime()+"Stop Game");
        process.exit();
    }
    _startGame(){
        this.gameState = "run";
        console.log(printer._getCurrentTime()+"Start Game");
        //console.log(this.dino);
        if(this.dino.checkIfDead()){
            this._gameOver();
        }
        else{
            this._gameLoop();
        }
    }
    _pauseGame(){
        this.gameState = "pause";
        console.log(printer._getCurrentTime()+"Pause Game");
    }
    _gameOver(){
        this.gameState = "game over";
        console.log(`${printer._getCurrentTime()}${this.dino.name} ist gestorben!!!`);
        this._stopGame();

    }
    _gameLoop(){
        if(this.autoSave){
            setInterval(()=>{
                this._saveGame()
                    .then((data)=>{console.log(printer._getCurrentTime()+"Auto Saved game");})
                    .catch((err)=>{throw err;});
            },20000);
        }
        if(this.gameState==="pause"){
            return;
        }
        let index =Math.floor(Math.random() * (3 - 0 + 1)) + 0;
        this.dino[this.funcs[index]].call(this.dino)
            .then((data)=> {
                if(this.gameState==="run"){
                    this.dino[data.need]-=data.value;
                    console.log(`${printer._getCurrentTime()}${this.dino.name}${this._getCurrentNeed(index)} (-${data.value}%)`);
                    this._saveEvent(`${printer._getCurrentTime()}${this.dino.name}${this._getCurrentNeed(index)} (-${data.value}%)`);
                    printer._printGameState(this);
                    this._saveEvent(printer._getGameState(this));
                }
            if(this.dino.checkIfDead()===false){
                this._gameLoop();
            }
            else{
                this._saveGame()
                    .then((data)=>{
                        console.log(printer._getCurrentTime()+"Saved game");
                        this._gameOver();
                    })
                    .catch((err)=>{throw err;});
            }
        }).catch((err)=> console.log(err));
    }

    _getCurrentNeed(index){
        if(index ===0){
            return " hat hunger!";
        }
        else if(index ===1){
            return " hat durst!";
        }
        else if(index===2){
            return " wird dreckig!";
        }
        else{
            return " wird krank!";
        }
    }
    _saveEvent(event){
        this.dino.events.push("\n"+event);
        //console.log(this.dino.events);
    }
    _autoSave(currentTime){
        let time = currentTime;
        if(currentTime-time>30){
            this._saveGame()
                .then((data)=>{console.log(printer._getCurrentTime()+"Auto Saved game");})
                .catch((err)=>{throw err;});
        }

    }
}

module.exports.Game = Game;
/**(err,data) =>{
             if(err) throw err;
             let json = JSON.parse(data);
             console.log(json);
         }**/
