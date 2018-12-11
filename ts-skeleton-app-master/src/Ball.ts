///<reference path = "Entity.ts"/>

class Ball extends Entity{

    private speed: number;

    public constructor(
        canvas: HTMLCanvasElement,
        imgSource: string,
        xPos: number,
        yPos: number,
        width: number, 
        height: number,
        speed: number
        ) {
        super(canvas, imgSource, xPos, yPos, width, height);

        this.speed = speed;
    }

    public move(){

    }

    public isCollidingWithBlock(enemy: Block): boolean{
        if (
            this.getX() < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()
        ) {
            return true;
        }
        return false;
    }


}