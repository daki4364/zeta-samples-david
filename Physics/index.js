import {Particle} from './particle.js';
import {Vector} from './vector.js';
import { Ship } from './ship.js';

const gravity = new Vector(0,0.3);

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onload = () =>{
    let canvas = document.querySelector('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let ship = new Ship(width/2, height/2, 0, 0, gravity,20,-.6,1,50,50);
//let particles = Array.from(Array(1));
    let p = new Particle(100,100,10,-45,gravity,50,-.6,1,50,100);

    let drawing = new Image();
    drawing.src = "sprite.png"; // can also be a remote URL e.g. http://

//particles.forEach((particle, index) => { particles[index] = new Particle(0, height, 10, -45, gravity)});
    update();

    function update(){
        context.clearRect(0,0,width,height);
        p.move();
        context.drawImage(drawing,p.position.getX(), p.position.getY(),p.width,p.height);
        //ship.update();
        /**context.beginPath();
        context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI *2, false);
        context.fill()
        ship.update();

        /**context.save();
        context.translate(p.position.getX(), p.position.getY());
        context.rotate(ship.rotation);

        context.moveTo(10,0);
        context.lineTo(-10,-7);
        context.lineTo(-10,7);
        context.lineTo(10,0);
        context.stroke();
        context.restore();**/

        if(p.position.getX()+p.width > width){
            p.position.setX(width - p.width);
            p.velocity.setX(p.velocity.getX() * p.bounce);
        }
        if(p.position.getX()<0){
            p.position.setX(0);
            p.velocity.setX(p.velocity.getX() *  p.bounce);
        }
        if(p.position.getY()+p.height > height){
            p.position.setY(height - p.height);
            p.velocity.setY(p.velocity.getY() *  p.bounce);
            p.friction = .99;
        }
        else{
            p.friction = 1;
        }
        if(p.position.getY()<0){
            p.position.setY(0);
            p.velocity.setY(p.velocity.getY() *  p.bounce);

        }
//particles.forEach(p =>{});



        requestAnimationFrame(update);
    }
};