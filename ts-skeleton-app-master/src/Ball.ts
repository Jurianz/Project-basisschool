///<reference path = "Entity.ts"/>

class Ball extends Entity {

    private dPos: number;
    private aPos: number;
    public constructor(
        canvas: HTMLCanvasElement,
        imgSource: string,
        xPos: number,
        yPos: number,
        width: number,
        height: number,
        dPos: number = -6,
        aPos: number = 6
    ) {
        super(canvas, imgSource, xPos, yPos, width, height);
        this.dPos = dPos;
        this.aPos = aPos;
    }

    public move() {
        this.xPos -= this.dPos
        this.yPos -= this.aPos
        if (this.getX() < 0) {
            this.dPos = -6;
        }
        if (this.getX() + (this.getWidth() - 10) > window.innerWidth) {
            this.dPos = 6;
        }
        if (this.getY() < 0) {
            this.aPos = -6;
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
        this.aPos = 6;
    }

    public removeLife() {
        this.aPos = 6;
        this.dPos = -6;
        this.xPos = this.canvas.getCenter().X;
        this.yPos = this.canvas.getCenter().Y;
    }

}