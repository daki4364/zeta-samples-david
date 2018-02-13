const dino = require('./dino.js');
const fs = require("fs");


class Game{

    constructor(filePath){
        this.gameState = "stop";
        this.filePath = filePath.toLowerCase();
        this.dino = new dino.Dino(this.filePath.split('.')[0]);
        fs.exists(this.filePath, (exists)=>{
            if(exists){
                console.log(this.filePath + " exists. Load game file");
                this._loadSaveFile(this.filePath);
            }
            else{
                console.log(this.filePath + " does not exists. Create game file");
                this._createSaveFile(this.filePath,this.dino.toJson())
                    .then((data)=>{if(data)this._loadSaveFile(this.filePath);})
                    .catch((err)=> {throw err;});
            }

        });

    }
    _loadSaveFile(filePath){
         new Promise((resolve, reject)=>{
             console.log("Load game file...");
             fs.readFile(filePath,(err, data) => {
                 if (err){
                     console.log("loading file rejected");
                     reject(err);
                 }
                 else {
                     console.log("loading file resolved");
                     resolve(JSON.parse(data));
                 }
             })
         }).then((data) => {this.dino.load(data); this._startGame()})
             .catch((err)=> {throw err});
    }
    _createSaveFile(filePath,data){
        return new Promise((resolve, reject)=>{
            console.log("Create new game file...");
            fs.writeFile(filePath,data,(err) => {
                if (err){
                    console.log("create game file rejected");
                    reject(err);
                }
                else {
                    console.log("create game file resolved");
                    resolve(true);
                }
            })
        });
    }

    _saveGame(){
        this._stopGame();
        new Promise((resolve, reject)=>{
            console.log("Saving game...");
            fs.writeFile(this.filePath,this.dino.toJson(),(err) => {
                if (err){
                    console.log("saving game rejected");
                    reject(err);
                }
                else {
                    console.log("saving game resolved");
                    resolve(true);
                }
            })
        }).then((data) => {if(data)this._startGame()})
            .catch((err)=> {throw err});
    }
    _stopGame(){
        this.gameState = "stop";
        console.log("Stop Game");
        process.exit();
    }
    _startGame(){
        this.gameState = "run";
        console.log("Start Game");
        this.dino._getsHungry();
    }
    _pauseGame(){
        this.gameState = "pause";
        console.log("Pause Game");
    }
    _gameOver(){
        this.gameState = "game over";
        console.log("Game Over");
    }
    toJson(){
        return JSON.stringify(this.dino);
    }
}

module.exports.Game = Game;
/**(err,data) =>{
             if(err) throw err;
             let json = JSON.parse(data);
             console.log(json);
         }**/