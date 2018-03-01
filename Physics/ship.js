import { Particle } from "./particle.js";
import { Vector } from "./vector.js";

export class Ship{

    constructor(x,y,speed,direction,gravity,radius,bounce,friction){
        this.particle = new Particle(x,y,speed,direction,gravity,radius,bounce,friction);
        this.thrust = new Vector(0,0);
        this.rotation = 0;
        this.turningLeft = false;
        this.turningRight = false;
        this.isThrusting = false;
        document.body.addEventListener('keydown', this.input.bind(this));
        document.body.addEventListener('keyup', this.reset.bind(this));
    }

    update(){
        if(this.turningLeft){
            this.rotation -= .05;
        }
        if(this.turningRight){
            this.rotation += .05;
        }
        this.thrust.setAngleRadians(this.rotation);
        if(this.isThrusting){
            this.thrust.setLength(.1);
        }
        else{
            this.thrust.setLength(0);
        }
        this.particle.accelerate(this.thrust);
        this.particle.move();
    }

    input(event){
        switch(event.keyCode){
            case 38:
                this.isThrusting = true;
                break;
            case 37:
                this.turningLeft = true;
                break;
            case 39:
                this.turningRight = true;
                break;
            default:
                break;
        }
    }

    reset(event){

        switch(event.keyCode){
            case 38:
                this.isThrusting = false;
                break;
            case 37:
                this.turningLeft = false;
                break;
            case 39:
                this.turningRight = false;
                break;
            default:
                break;
        }
    }

}