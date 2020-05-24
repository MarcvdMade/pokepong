class PaddleTwo {

    private div: HTMLElement
    private x: number
    private y: number

    private downkey: number
    private upkey: number

    private downSpeed: number = 0
    private upSpeed: number = 0

    constructor() {
        this.div = document.createElement("paddle")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)

        this.upkey   = 38
        this.downkey = 40

        this.x = window.innerWidth - this.div.clientWidth
        this.y = 200

        this.div.style.filter = `hue-rotate(110deg)`

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    private onKeyDown(e: KeyboardEvent): void {
        // Hiermee kan je checken welke keycode achter een bepaalde toets zit. 
        // console.log(e.keyCode)

        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5
                break
            case this.downkey:
                this.downSpeed = 5
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0
                break
            case this.downkey:
                this.downSpeed = 0
                break
        }
    }

    public update() {
        let newY = this.y - this.upSpeed + this.downSpeed

        // check of de paddle binnen beeld blijft
        if (newY > 0 && newY + 100 < window.innerHeight) this.y = newY

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    
    public getX() {
        return this.x
    }

    public getY() {
        return this.y
    }

    public getWidth() {
        return this.div.clientWidth;
    }

    public getHeight() {
        return this.div.clientHeight
    }

}