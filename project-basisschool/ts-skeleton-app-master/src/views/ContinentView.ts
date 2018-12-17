///<reference path="ViewBase.ts"/>

class ContinentView extends ViewBase {

    public constructor(){
        super();
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
        this.createScreen();
    }

    createScreen() {
        document.body.style.background = "url('./assets/images/backgrounds/universalBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-1";

        this.canvas.writeImageToCanvas("./assets/images/continents/europe.png", this.canvas.getCenter().X -151, this.canvas.getCenter().Y - 116);
    }
}