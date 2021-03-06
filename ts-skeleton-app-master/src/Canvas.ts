class Canvas {

    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private clicks: number;
    private easyClicks: number;
    private topoClicks: number;
    private difficultClicks: number;

    constructor(
        canvas: HTMLCanvasElement
    ) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.clicks = 0;
        this.easyClicks = 0;
        this.topoClicks = 0;
        this.difficultClicks = 0;
    };

    /**
     * Clears the canvas
     */
    public clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

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
    };

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
    };

    /**
     * Renders a random number between min and max
     * @param min 
     * @param max 
     */
    public randomNumber(
        min: number,
        max: number
    ): number {
        return Math.round(Math.random() * (max - min) + min);
    };

    /**
     * Function to get the center of the canvas
     */
    public getCenter(): { X: number, Y: number } {
        return { X: this.canvas.width / 2, Y: this.canvas.height / 2 };
    };

    /**
     * A function to write the startbutton to the canvas
     * @param src 
     * @param imageWidth 
     * @param imageHeight 
     * @param imageYpos 
     */
    public writeStartButtonToCanvas(src: string, imageWidth: number, imageHeight: number, imageYpos: number) {
        const horizontalCenter = this.canvas.width / 2;
        const verticalCenter = this.canvas.height / 2;

        let buttonElement = document.createElement("img");
        buttonElement.src = src;


        buttonElement.addEventListener("load", () => {
            this.ctx.drawImage(buttonElement, horizontalCenter - (imageWidth / 2), verticalCenter - imageYpos);
        });

        this.canvas.addEventListener("click", (event: MouseEvent) => {
            if (event.x > horizontalCenter - (imageWidth / 2) && event.x < horizontalCenter + (imageWidth / 2)) {
                if (event.y > verticalCenter - imageYpos && event.y < verticalCenter - imageYpos + imageHeight) {
                    if (this.clicks == 0) {
                        this.clearCanvas();
                        const difficultView = new DifficultyView();
                        difficultView.createScreen();
                        this.clicks++;
                    };
                };
            };
        });
    };

    /**
     * A function to write the easy difficulty button to the canvas
     * @param src 
     * @param imageWidth 
     * @param imageHeight 
     * @param imageYpos 
     */
    public writeEasyDifficultyButtonToCanvas(src: string, imageWidth: number, imageHeight: number, imageYpos: number) {
        const horizontalCenter = this.canvas.width / 2;
        const verticalCenter = this.canvas.height / 2;

        let buttonElement = document.createElement("img");
        buttonElement.src = src;


        buttonElement.addEventListener("load", () => {
            this.ctx.drawImage(buttonElement, horizontalCenter - (imageWidth / 2), verticalCenter - imageYpos);
        });

        this.canvas.addEventListener("click", (event: MouseEvent) => {
            if (event.x > horizontalCenter - (imageWidth / 2) && event.x < horizontalCenter + (imageWidth / 2)) {
                if (event.y > verticalCenter - imageYpos && event.y < verticalCenter - imageYpos + imageHeight) {
                    if (this.easyClicks == 0) {
                        this.clearCanvas();
                        this.easyClicks++;
                        this.startEasyCountdown(3);
                    };
                };
            };
        });
    };

    /**
     * A function to write the topography difficulty button to the canvas
     * @param src 
     * @param imageWidth 
     * @param imageHeight 
     * @param imageYpos 
     */
    public writeTopoDifficultyButtonToCanvas(src: string, imageWidth: number, imageHeight: number, imageYpos: number) {
        const horizontalCenter = this.canvas.width / 2;
        const verticalCenter = this.canvas.height / 2;

        let buttonElement = document.createElement("img");
        buttonElement.src = src;


        buttonElement.addEventListener("load", () => {
            this.ctx.drawImage(buttonElement, horizontalCenter - (imageWidth / 2), verticalCenter - imageYpos);
        });

        this.canvas.addEventListener("click", (event: MouseEvent) => {
            if (event.x > horizontalCenter - (imageWidth / 2) && event.x < horizontalCenter + (imageWidth / 2)) {
                if (event.y > verticalCenter - imageYpos && event.y < verticalCenter - imageYpos + imageHeight) {
                    if (this.topoClicks == 0) {
                        this.clearCanvas();
                        this.topoClicks++;
                        this.startTopoCountdown(3);
                    };
                };
            };
        });
    };

    /**
     * A function to write the difficult difficulty button to the canvas
     * @param src 
     * @param imageWidth 
     * @param imageHeight 
     * @param imageYpos 
     */
    public writeDifficultDifficultyButtonToCanvas(src: string, imageWidth: number, imageHeight: number, imageYpos: number) {
        const horizontalCenter = this.canvas.width / 2;
        const verticalCenter = this.canvas.height / 2;

        let buttonElement = document.createElement("img");
        buttonElement.src = src;


        buttonElement.addEventListener("load", () => {
            this.ctx.drawImage(buttonElement, horizontalCenter - (imageWidth / 2), verticalCenter - imageYpos);
        });

        this.canvas.addEventListener("click", (event: MouseEvent) => {
            if (event.x > horizontalCenter - (imageWidth / 2) && event.x < horizontalCenter + (imageWidth / 2)) {
                if (event.y > verticalCenter - imageYpos && event.y < verticalCenter - imageYpos + imageHeight) {
                    if (this.difficultClicks == 0) {
                        this.clearCanvas();
                        this.difficultClicks++;
                        this.startDifficultCountdown(3);
                    };
                };
            };
        });
    };

    /**
     * A function to start the countdown and set easy questions
     * @param seconds 
     */
    public startEasyCountdown(seconds: number): void {
        var counter = seconds;
        this.writeTextToCanvas('Europe Explorer', 100, this.getCenter().X, this.getCenter().Y - 275, "white");

        var interval = setInterval(() => {
            this.clearCanvas();
            const levelView = new LevelView();
            this.writeTextToCanvas(`${counter}`, 250, this.getCenter().X, this.getCenter().Y + 150, "white");
            counter--;

            if (counter < 0) {
                clearInterval(interval);
                levelView.setEasyQuestions();
            };
        }, 1000);
    };

    /**
     * A function to start the countdown and set topography questions
     * @param seconds 
     */
    public startTopoCountdown(seconds: number): void {
        var counter = seconds;
        this.writeTextToCanvas('Europe Explorer', 100, this.getCenter().X, this.getCenter().Y - 275, "white");

        var interval = setInterval(() => {
            this.clearCanvas();
            const levelView = new LevelView();
            this.writeTextToCanvas(`${counter}`, 250, this.getCenter().X, this.getCenter().Y + 150, "white")
            counter--;

            if (counter < 0) {
                clearInterval(interval);
                levelView.setTopoQuestions();
            };
        }, 1000);
    };

    /**
     * A function to start the countdown and set difficult questions
     * @param seconds 
     */
    public startDifficultCountdown(seconds: number): void {
        var counter = seconds;
        this.writeTextToCanvas('Europe Explorer', 100, this.getCenter().X, this.getCenter().Y - 275, "white");

        var interval = setInterval(() => {
            this.clearCanvas();
            const levelView = new LevelView();
            this.writeTextToCanvas(`${counter}`, 250, this.getCenter().X, this.getCenter().Y + 150, "white")
            counter--;

            if (counter < 0) {
                clearInterval(interval);
                levelView.setDifficultQuestions();
            };
        }, 1000);
    };

    /**
     * A function to write the try again button to the canvas
     * @param src 
     * @param imageWidth 
     * @param imageHeight 
     * @param imageYpos 
     */
    public writeTryAgainButtonToCanvas(src: string, imageWidth: number, imageHeight: number, imageYpos: number) {
        const horizontalCenter = this.canvas.width / 2;
        const verticalCenter = this.canvas.height / 2;

        let buttonElement = document.createElement("img");
        buttonElement.src = src;


        buttonElement.addEventListener("load", () => {
            this.ctx.drawImage(buttonElement, horizontalCenter - (imageWidth / 2), verticalCenter - imageYpos);
            this.clicks = 1;
        });

        this.canvas.addEventListener("click", (event: MouseEvent) => {
            if (event.x > horizontalCenter - (imageWidth / 2) && event.x < horizontalCenter + (imageWidth / 2)) {
                if (event.y > verticalCenter - imageYpos && event.y < verticalCenter - imageYpos + imageHeight) {
                    if (this.clicks == 1) {
                        location.reload();
                    };
                };
            };
        });
    };

    /**
     * A function to get the height of the canvas
     */
    public getHeight(): number {
        return this.canvas.height;
    };

    /**
     * A function to get the width of the canvas
     */
    public getWidth(): number {
        return this.canvas.width;
    };
};
