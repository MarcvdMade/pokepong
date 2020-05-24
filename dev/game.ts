/// <reference path="ball.ts"/>

class Game {
    
    private balls:Ball[] = []
    private paddle: Paddle
    private paddleTwo: PaddleTwo
    private score: number = 0
    private hits: number = 0
    
    constructor() {
        this.balls.push( new Ball())

        this.paddle = new Paddle()
        this.paddleTwo = new PaddleTwo()
        // this.balls.push( new Ball())

        this.gameLoop()
    }

    //check collision
    checkCollision(a: Paddle, b: Ball) {
        return (a.getX() < b.getX() + b.getWidth() &&
            a.getX() + a.getWidth() > b.getX() &&
            a.getY() < b.getY() + b.getHeight() &&
            a.getY() + a.getHeight() > b.getY())
     }

     checkCollisionTwo(a: PaddleTwo, b: Ball) {
        return (a.getX() < b.getX() + b.getWidth() &&
            a.getX() + a.getWidth() > b.getX() &&
            a.getY() < b.getY() + b.getHeight() &&
            a.getY() + a.getHeight() > b.getY())
     }
    
    private gameLoop(){
        //maak loop die door array loopt
        for (let i = 0; i < this.balls.length; i++) {

            this.balls[i].update()  

            //check for collision
            let hit = this.checkCollision(this.paddle, this.balls[i])
            let hitTwo = this.checkCollisionTwo(this.paddleTwo, this.balls[i])
            if (hit || hitTwo) {
                // console.log(this.balls[i].xspeed)
    
                this.balls[i].xspeed *= -1
                this.balls[i].xspeed *= 1.2
                this.balls[i].yspeed *= 1.2
                this.hits += 1
                console.log("Thats a hit!!!")

                //get the score element
                let score = document.getElementsByTagName("score")[0]
                score.innerHTML = ""

                //set new score
                this.score += 100
                score.innerHTML = `Score: ${this.score}`

                //add balls if you hit 5 times
                if (this.hits == 5) {
                    this.balls.push( new Ball())
                    this.hits = 0
                }

            }

            
            //remove balls if they leave the screen
            if (this.balls[i].getX() < 0 || this.balls[i].getX() > window.innerWidth) {
                this.balls[i].delete()
                this.balls.splice(i, 1)
            }

            //create game over
            if(this.balls.length == 0) {
                let score = document.getElementsByTagName("score")[0]
                score.innerHTML = "Game Over"
            }
        }

        //update paddle
        this.paddle.update()
        this.paddleTwo.update()
        requestAnimationFrame(()=>this.gameLoop())
    }
    
} 

window.addEventListener("load", () => new Game())