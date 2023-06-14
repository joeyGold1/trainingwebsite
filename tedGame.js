const GAME_WIDTH = 720;
const GAME_HEIGHT = 576;
const PADDLE_HEIGHT = 100;
const BALL_SPEED_X = 100;
const TICK_INTERVAL = 10;
const BALL_WIDTH = 23.2;
const BALL_HEIGHT = 20;

class Game {
    leftPaddle;
    rightPaddle;
    ball;
    tickTime;
    constructor() {
        this.leftPaddle = new Paddle('leftpaddle');
        this.rightPaddle = new Paddle('rightpaddle');
        this.ball = new Ball();
    }

    async startGame() {
        this.tickTime = new Date().getTime();
        this.interval = setInterval(this.tick, TICK_INTERVAL);
    }
    tick = () => {
        console.log('on time update');
        window.output.push('on time update');
        console.log(this.tickTime);
        const timeElapsedInMs = new Date().getTime()-this.tickTime;
        this.leftPaddle.update(timeElapsedInMs);
        this.rightPaddle.update(timeElapsedInMs);
        const infoFromBall = this.ball.update(timeElapsedInMs);
        this.updateGoalCounters(infoFromBall.goalScoredLeft, infoFromBall.goalScoredRight);
    }

    updateGoalCounters(tedScored, youScored) {}

}

class Paddle {

    constructor(id) {
        this.y = (GAME_HEIGHT-PADDLE_HEIGHT)/2;
        this.element = document.getElementById(id)
    }

    update() {
        this.updateDisplay();
    }
    updateDisplay() {
        this.element.style.top = `${this.y}px`;
    }
}

class Ball {
    constructor() {
        this.leftX = GAME_WIDTH/2;
        this.topY = GAME_HEIGHT/2;
        this.speedY = 0;
        this.element = document.getElementById('ball')
    }

    update(timeElapsed) {
        this.leftX += BALL_SPEED_X * TICK_INTERVAL / 1000;
        this.rightX = this.leftX + BALL_WIDTH;
        this.topY += this.speedY * TICK_INTERVAL / 1000;
        this.bottomY = this.topY + BALL_HEIGHT;
        this.handleEdgeCollisions();
        const pointScoreInfo = this.handlePointScored();
        this.updateDisplay();
        return {...pointScoreInfo}
    }

    handleEdgeCollisions() {
        if (this.topY < 0) {this.topY = -this.topY;}
        if (this.bottomY > GAME_HEIGHT) {this.topY = 760*2-this.bottomY-BALL_HEIGHT;}
    }

    handlePointScored() {
        if (this.rightX > GAME_WIDTH) {
            this.reset();
            return {goalScoredLeft: true};
        }
        if (this.leftX < 0) {
            this.reset();
            return {goalScoredRight: true};
        }
    }

    reset() {
        this.leftX = GAME_WIDTH/2;
        this.topY = GAME_HEIGHT/2;
        this.speedY = 0;
    }

    updateDisplay() {
        this.element.style.top = `${this.topY}px`;
        this.element.style.left = `${this.leftX}px`;
    }

}



window.output = [];

const game = new Game();
const gameElement = document.getElementById('tedPong');
gameElement.addEventListener('keypress', game.startGame);
game.startGame();



