///<reference path="Viewbase.ts"/>

class DifficultyView extends ViewBase {

    public constructor(){
        super();
        const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas = new Canvas(canvasElement);
    }

    createScreen() {
        document.body.style.background = "url('./assets/images/backgrounds/universalBackground.png') no-repeat ";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "-1";
        
    }
}