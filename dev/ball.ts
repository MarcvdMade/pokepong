class Ball {
    
    private div : HTMLElement
    private x : number
    private y : number
    public xspeed : number = 1
    public yspeed : number = 1
    
    constructor() {
        this.div = document.createElement("ball")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)

        this.x = Math.random() * (window.innerWidth - this.div.clientWidth)
        this.y = Math.random() * (window.innerHeight - this.div.clientHeight)
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }
    
    public update() : void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`

        //voeg steeds 1 toe
        this.x += this.xspeed
        this.y += this.yspeed

        //log de x en y in de console
        // console.log(`x = ${this.x} en y = ${this.y}`)

        //check of de ball buiten de breedte van het scherm gaat
        // if (this.x > window.innerWidth - this.div.clientWidth) {
        //     this.xspeed *= -1
            // console.log(this.xspeed)
        // }
        
        //check of de ball buiten de hoogte van het scherm gaat
        if (this.y > window.innerHeight - this.div.clientHeight  || this.y <= 0) {
            this.yspeed *= -1
        }
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

    public delete() {
        this.div.remove()
    }
}