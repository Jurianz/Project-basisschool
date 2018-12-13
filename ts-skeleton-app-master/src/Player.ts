/// <reference path = "Entity.ts"/>
/// <reference path = "KeyboardListener.ts"/>

class Player extends Entity{

    private readonly keyBoardListener: KeyBoardListener;
    private lives: number;

    public constructor(
        canvas: HTMLCanvasElement,
        imgSource: string,
        xPos: number,
        yPos: number,
        width: number, 
        height: number,
        lives: number = 3
        ) {
            super(canvas, imgSource, xPos, yPos, width, height);

        this.keyBoardListener = new KeyBoardListener();
        this.lives = lives;
    }

    public move(): void{
        if (this.keyBoardListener.getLeftPressed()) {
            this.xPos -= 8;
        }
        if (this.keyBoardListener.getRightPressed()) {
            this.xPos += 8;
        }
        if (this.xPos < 0) {
            this.xPos = 0
        }
        if (this.getX() + (this.getWidth() +150)  > window.innerWidth) {
            this.xPos = window.innerWidth - (this.getWidth() +150)
        }
    }
}