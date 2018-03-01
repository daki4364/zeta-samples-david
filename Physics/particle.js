import {Vector} from './vector.js';

export class Particle{

    constructor(x, y, speed, direction, gravity, radius, bounce, friction, width, height){
        this.position = new Vector(x,y);
        this.velocity = new Vector(0,0);
        this.velocity.setLength(speed);
        this.velocity.setAngle(direction);
        this.friction = friction<=1 && friction >= 0 ? friction : 0;
        this.gravity = gravity;
        this.radius = radius;
        this.bounce = bounce;
        this.width = width;
        this.height =  height;
    }

    move(){
        this.velocity.multiplyBy(this.friction);
        this.velocity.addTo(this.gravity);
        this.position.addTo(this.velocity);
    }

    accelerate(accel){
        this.velocity.addTo(accel);
    }
}