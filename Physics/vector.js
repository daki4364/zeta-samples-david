export class Vector{

    constructor(x, y){
        this._x = x;
        this._y = y;
    }

    setX(value){
        this._x = value;
    }

    getX(){
        return this._x;
    }

    setY(value){
        this._y = value;
    }

    getY(){
        return this._y;
    }

    setAngle(angle){
        angle = angle*Math.PI/180;
        let length = this.getLength();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    }

    setAngleRadians(angle){
        let length = this.getLength();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    }

    getAngle(){
        return Math.atan2(this._y, this._x);
    }

    getLength(){
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    setLength(length){
        let angle = this.getAngle();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    }

    add(v2){
        return new Vector(this._x + v2.getX(), this._y + v2.getY());
    }

    addTo(v2){
        this._x += v2.getX();
        this._y += v2.getY();

    }

    substractFrom(v2){
        this._x -= v2.getX();
        this._y -= v2.getY();

    }

    substract(v2){
        return new Vector(this._x - v2.getX(), this._y - v2.getY());
    }

    substractFrom(v2){
        this._x -= v2.getX();
        this._y -= v2.getY();

    }

    multiply(val){
        return new Vector(this._x * val, this._y * val);
    }

    multiplyBy(val){
        this._x *= val;
        this._y *= val;
    }

    divide(val){
        return new Vector(this._x / val, this._y / val);
    }

    divideBy(val){
        this._x /= val;
        this._y /= val;
    }
};