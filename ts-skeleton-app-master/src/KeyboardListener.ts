class KeyBoardListener{

    private leftPressed: boolean;
    private rightPressed: boolean;
    
    public constructor(){
        this.leftPressed = false;
        this.rightPressed = false;
        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    }

    /**
    * Function to handle the key down
    */
    private keyDownHandler = (event: KeyboardEvent) => {
        if (event.keyCode == 37) {
            this.leftPressed = true;
        }
        if (event.keyCode == 39) {
            this.rightPressed = true;
        }
    }

    /**
    * Function to handle the key up 
    */
    private keyUpHandler = (event: KeyboardEvent) => {
        if (event.keyCode == 37) {
            this.leftPressed = false; 
        }
        if (event.keyCode == 39) {
            this.rightPressed = false;
        }
    }

    /**
     * Function to get the leftPressed property
     */
    public getLeftPressed(): boolean{
        return this.leftPressed;
    }

    /**
     * Function to get the rightPressed property
     */
    public getRightPressed(): boolean{
        return this.rightPressed;
    }
}