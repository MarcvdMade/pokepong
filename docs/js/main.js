"use strict";
var Ball = (function () {
    function Ball() {
        this.xspeed = 1;
        this.yspeed = 1;
        this.div = document.createElement("ball");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.div);
        this.x = Math.random() * (window.innerWidth - this.div.clientWidth);
        this.y = Math.random() * (window.innerHeight - this.div.clientHeight);
    }
    Ball.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Ball.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.x += this.xspeed;
        this.y += this.yspeed;
        if (this.y > window.innerHeight - this.div.clientHeight || this.y <= 0) {
            this.yspeed *= -1;
        }
    };
    Ball.prototype.getX = function () {
        return this.x;
    };
    Ball.prototype.getY = function () {
        return this.y;
    };
    Ball.prototype.getWidth = function () {
        return this.div.clientWidth;
    };
    Ball.prototype.getHeight = function () {
        return this.div.clientHeight;
    };
    Ball.prototype.delete = function () {
        this.div.remove();
    };
    return Ball;
}());
var Game = (function () {
    function Game() {
        this.balls = [];
        this.score = 0;
        this.hits = 0;
        this.balls.push(new Ball());
        this.paddle = new Paddle();
        this.paddleTwo = new PaddleTwo();
        this.gameLoop();
    }
    Game.prototype.checkCollision = function (a, b) {
        return (a.getX() < b.getX() + b.getWidth() &&
            a.getX() + a.getWidth() > b.getX() &&
            a.getY() < b.getY() + b.getHeight() &&
            a.getY() + a.getHeight() > b.getY());
    };
    Game.prototype.checkCollisionTwo = function (a, b) {
        return (a.getX() < b.getX() + b.getWidth() &&
            a.getX() + a.getWidth() > b.getX() &&
            a.getY() < b.getY() + b.getHeight() &&
            a.getY() + a.getHeight() > b.getY());
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var i = 0; i < this.balls.length; i++) {
            this.balls[i].update();
            var hit = this.checkCollision(this.paddle, this.balls[i]);
            var hitTwo = this.checkCollisionTwo(this.paddleTwo, this.balls[i]);
            if (hit || hitTwo) {
                this.balls[i].xspeed *= -1;
                this.balls[i].xspeed *= 1.2;
                this.balls[i].yspeed *= 1.2;
                this.hits += 1;
                console.log("Thats a hit!!!");
                var score = document.getElementsByTagName("score")[0];
                score.innerHTML = "";
                this.score += 100;
                score.innerHTML = "Score: " + this.score;
                if (this.hits == 5) {
                    this.balls.push(new Ball());
                    this.hits = 0;
                }
            }
            if (this.balls[i].getX() < 0 || this.balls[i].getX() > window.innerWidth) {
                this.balls[i].delete();
                this.balls.splice(i, 1);
            }
            if (this.balls.length == 0) {
                var score = document.getElementsByTagName("score")[0];
                score.innerHTML = "Game Over";
            }
        }
        this.paddle.update();
        this.paddleTwo.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Paddle = (function () {
    function Paddle() {
        var _this = this;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.div = document.createElement("paddle");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.div);
        this.upkey = 87;
        this.downkey = 83;
        this.x = 0;
        this.y = 200;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Paddle.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Paddle.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5;
                break;
            case this.downkey:
                this.downSpeed = 5;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        if (newY > 0 && newY + 100 < window.innerHeight)
            this.y = newY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Paddle.prototype.getX = function () {
        return this.x;
    };
    Paddle.prototype.getY = function () {
        return this.y;
    };
    Paddle.prototype.getWidth = function () {
        return this.div.clientWidth;
    };
    Paddle.prototype.getHeight = function () {
        return this.div.clientHeight;
    };
    return Paddle;
}());
var PaddleTwo = (function () {
    function PaddleTwo() {
        var _this = this;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.div = document.createElement("paddle");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.div);
        this.upkey = 38;
        this.downkey = 40;
        this.x = window.innerWidth - this.div.clientWidth;
        this.y = 200;
        this.div.style.filter = "hue-rotate(110deg)";
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    PaddleTwo.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    PaddleTwo.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5;
                break;
            case this.downkey:
                this.downSpeed = 5;
                break;
        }
    };
    PaddleTwo.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
        }
    };
    PaddleTwo.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        if (newY > 0 && newY + 100 < window.innerHeight)
            this.y = newY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    PaddleTwo.prototype.getX = function () {
        return this.x;
    };
    PaddleTwo.prototype.getY = function () {
        return this.y;
    };
    PaddleTwo.prototype.getWidth = function () {
        return this.div.clientWidth;
    };
    PaddleTwo.prototype.getHeight = function () {
        return this.div.clientHeight;
    };
    return PaddleTwo;
}());
//# sourceMappingURL=main.js.map