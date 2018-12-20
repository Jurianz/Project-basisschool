///<reference path = "Entity.ts"/>

class Ball extends Entity {

    private dPos: number;
    private wPos: number;

    public constructor(
        canvas: HTMLCanvasElement,
        imgSource: string,
        xPos: number,
        yPos: number,
        width: number,
        height: number,
        dPos: number = -4,
        wPos: number = 4
    ) {
        super(canvas, imgSource, xPos, yPos, width, height);
        this.dPos = dPos;
        this.wPos = wPos;
    }

    public move() {
        this.xPos += this.dPos
        this.yPos -= this.wPos
        if (this.getX() < 0) {
            this.dPos = -this.dPos;
        }
        if (this.getX() + (this.getWidth() - 10) > window.innerWidth) {
            this.dPos = -this.dPos;
        }
        if (this.getY() < 0) {
            this.wPos = -this.wPos;
        }
    }

    public isCollidingWithBlock(enemy: Block): boolean {
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

    public collidedWithPlayer() {
        this.wPos = 4;
    }

    public removeLife() {
        this.wPos = -this.wPos;
        this.xPos = this.canvas.getCenter().X;
        this.yPos = this.canvas.getCenter().Y;
    }

    public collidedWithBlock() {
        this.wPos = -this.wPos
    }

}