class Canvas {

    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private clicks: number;

    constructor(
        canvas: HTMLCanvasElement
    ) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.clicks = 0;
    }

    /**
     * Clears the canvas
     */
    public clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    /**
    * Writes text to the canvas
    * @param text 
    * @param fontSize 
    * @param xCoordinate 
    * @param yCoordinate 
    * @param color 
    * @param aligment 
    */
    public writeTextToCanvas(
        text: string,
        fontSize: number,
        xCoordinate: number,
        yCoordinate: number,
        color: string,
        aligment: CanvasTextAlign = "center"
    ) {
        this.ctx.font = `${fontSize}px Mars`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = aligment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }

    /**
     * Draws an image to the canvas
     * @param src 
     * @param xCoordinate 
     * @param yCoordinate 
     */
    public writeImageToCanvas(
        src: string,
        xCoordinate: number,
        yCoordinate: number
    ) {
        let element = document.createElement("img");
        element.src = src;
        element.style.zIndex = "-1";

        element.addEventListener("load", () => {
            this.ctx.drawImage(element, xCoordinate, yCoordinate);
        });
    }

    /**
     * Renders a random number between min and max
     * @param min 
     * @param max 
     */
    public randomNumber(
        min: number,
        max: number): number {

        return Math.round(Math.random() * (max - min) + min);
    }

    public getCenter(): { X: number, Y: number } {
        return { X: this.canvas.width / 2, Y: this.canvas.height / 2 }
    }

    public writeButtonToCanvas(src: string, imageWidth: number, imageHeight: number, imageYpos: number, numberofClicksBefore: number) {
        const horizontalCenter = this.canvas.width / 2;
        const verticalCenter = this.canvas.height / 2;

        let buttonElement = document.createElement("img");
        buttonElement.src = src;


        buttonElement.addEventListener("load", () => {
            this.ctx.drawImage(buttonElement, horizontalCenter - imageWidth, verticalCenter - imageYpos);
            this.clicks = numberofClicksBefore;
        });

        this.canvas.addEventListener("click", (event: MouseEvent) => {
            if (event.x > horizontalCenter - imageWidth && event.x < horizontalCenter + imageWidth) {
                if (event.y > verticalCenter - imageYpos && event.y < verticalCenter - imageYpos + imageHeight) {
                    if (this.clicks === 0) {
                        this.clearCanvas()
                        this.startCountdown(3);
                        this.clicks++;
                    }
                }
            }
        });
    };

    public startCountdown(seconds: number): void {
        var counter = seconds;
        this.writeTextToCanvas('World Explorer', 100, this.getCenter().X, 100, "white", "center");

        var interval = setInterval(() => {
            this.clearCanvas();
            this.writeTextToCanvas('World Explorer', 100, this.getCenter().X, 100, "white", "center");
            this.writeTextToCanvas(`${counter}`, 250, this.getCenter().X, this.getCenter().Y - 75, "white")
            counter--;

            if (counter < 0) {
                clearInterval(interval);
                const levelView = new LevelView();
            };
        }, 1000);
    };

    public getHeight(): number {
        return this.canvas.height
    };

    public getWidth(): number {
        return this.canvas.width
    };
}
