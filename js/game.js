function Game(canvadId) {
    this.canvas = document.getElementById(canvadId);
    this.ctx = this.canvas.getContext("2d");
    this.round1 = new Image();
    this.round1.src = 'img/round1.png';
    this.round2 = new Image();
    this.round2.src = 'img/round2.png';
    this.round3 = new Image();
    this.round3.src = 'img/round3.png'
    this.reset();
}

Game.prototype.reset = function () {
    this.respondtoKeys = false; //prevent onkeydown events before players come out
    this.cancelKeysIfWin = false; //turns true when we have a winner and stop responding to onkeydown events
    this.changeRound = false;
    this.roundNumber = 1;
    this.roundY = 600;
    this.winnerText = '';
    this.framesCounter = 0;
    this.timeCount = 0;
    this.seconds = 0;
    this.gamesWonPlayer1 = 0;
    this.gamesWonPlayer2 = 0;
    this.background = new Background(this);
    this.player1 = new Player(this, 'img/Tyson.png', 77, 116.8, 8, 0, 3, 300, 300, 4, 1, 1.5);//game, playerSrc, frameWidth, frameHeight, frameSpeed, startFrame, endFrame, x, y,famesperRow,player#,scale
    this.player2 = new Player(this, 'img/LittleMac.png', 69.25, 137, 8, 0, 3, 200, 200, 4, 2, 1.3);
    //this.effect1 = new visualEffect(this, this.player1, 'img/Fire.png', 1);//game, player, src, scale
    this.listeners();
};

Game.prototype.startGame = function () {
    this.roundInterval = setInterval(function () {
        this.roundY -= 7;
        if (this.roundNumber == 1) {
            this.clear();
            this.ctx.drawImage(this.round1, 0, this.roundY, 700, 600);
        } else if (this.roundNumber == 2) {
            this.clear();
            this.ctx.drawImage(this.round2, 0, this.roundY, 700, 600);
        } else if (this.roundNumber == 3) {
            this.clear();
            this.ctx.drawImage(this.round3, 0, this.roundY, 700, 600);
        }
        if (this.roundY < -600) {
            clearInterval(this.roundInterval);
            this.startPlay();
            this.respondtoKeys = true; //start responding to keydown events
        }
    }.bind(this), 1000 / 60);
};

Game.prototype.startPlay = function () {
    this.interval = setInterval(function () {
        this.framesCounter++;
        this.timeCount++;
        if (this.framesCounter > 1000) {
            this.framesCounter = 0;
        }
        if (this.timeCount % 60 == 0 && this.cancelKeysIfWin == false) {
            this.seconds++;
        }
        if (this.cancelKeysIfWin == true && this.changeRound == false) {
            setTimeout(function () {
                clearInterval(this.interval);
                this.nextRound();
            }.bind(this), 5000);
            this.changeRound = true;
        }
        this.clear();
        this.updateALL();
        this.drawALL();
    }.bind(this), 1000 / 60);
}

Game.prototype.drawALL = function () {
    this.player1.draw();
    this.player2.draw();
    this.background.blocksDraw();
    this.background.lifeBarDraw(this.player2);
    this.background.lifeBarDraw(this.player1);
    this.background.pointsDraw(this.player2);
    this.background.pointsDraw(this.player1);
    this.background.clock();
    if (this.cancelKeysIfWin == true) {
        this.background.winDraw(this.winnerText);
    }
    if (this.player1.startFrame == 4) {
        //this.effect1.draw();
        //setTimeout(this.effect1.draw(-70),500);
    }
}

Game.prototype.updateALL = function () {
    this.player1.update();
    this.player2.update();
    if (this.player1.startFrame == 4 && this.player2.startFrame == 4) {
        this.calculateLifeP1();
        this.calculateLifeP2();
    } else if (this.player1.startFrame == 4) {
        this.calculateLifeP2();
        //this.effect1.update();
        //setTimeout(this.effect1.update(),500);
    } else if (this.player2.startFrame == 4) {
        this.calculateLifeP1();
    }
    if (this.cancelKeysIfWin == true) {
        this.background.winAnimate();
    }
}

Game.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.nextRound = function () {
    this.roundNumber++;
    this.roundY = 600;
    this.winnerText = '';
    this.respondtoKeys = false;//prevent Onkeydown events before players come out
    this.cancelKeysIfWin = false;
    this.changeRound = false;
    this.framesCounter = 0;
    this.timeCount = 0;
    this.seconds = 0;
    this.player1.life = 100;
    this.player2.life = 100;
    this.player1.startFrame = 0;
    this.player1.endFrame = 3;
    this.player2.startFrame = 0;
    this.player2.endFrame = 3;
    this.startGame();
}

Game.prototype.calculateLifeP1 = function () {
    if (this.player1.x <= this.player2.attackRangeX[1] &&
        this.player1.x >= this.player2.attackRangeX[0] &&
        this.player1.y >= this.player2.attackRangeY[0] &&
        this.player1.y <= this.player2.attackRangeY[1]) {
        this.player1.life -= 0.5;
    }
}

Game.prototype.calculateLifeP2 = function () {
    if (this.player2.x <= this.player1.attackRangeX[1] &&
        this.player2.x >= this.player1.attackRangeX[0] &&
        this.player2.y >= this.player1.attackRangeY[0] &&
        this.player2.y <= this.player1.attackRangeY[1]) {
        this.player2.life -= 0.5;
    }
}

Game.prototype.isOver = function (winner) {
    if (typeof winner == 'string') {
        this.player1.startFrame = 16;
        this.player1.endFrame = 17;
        this.player2.startFrame = 12;
        this.player2.endFrame = 13;
    } else if (winner.pnumber == 1) {
        this.player1.startFrame = 16;
        this.player1.endFrame = 17;
        this.player2.startFrame = 10;
        this.player2.endFrame = 10;
    } else {
        this.player2.startFrame = 12;
        this.player2.endFrame = 13;
        this.player1.startFrame = 14;
        this.player1.endFrame = 14;
    }
};

Game.prototype.listeners = function () {
    document.onkeydown = function (e) {
        e.preventDefault();
        if (this.cancelKeysIfWin == false && this.respondtoKeys == true) {
            if ((this.player1.x + this.player1.speedX + this.player1.frameWidth) <= 700
                && (this.player1.x + this.player1.speedX) >= 0
                && (this.player1.y + this.player1.speedY) >= 100
                && (this.player1.y + this.player1.speedY + this.player1.frameHeight) <= 600) {
                switch (e.keyCode) {
                    case 65: this.player1.speedX -= 1; break;
                    case 68: this.player1.speedX += 1; break;
                    case 87: this.player1.speedY -= 1; break;
                    case 83: this.player1.speedY += 1; break;
                    case 69: this.player1.startFrame = 4, this.player1.endFrame = 7, this.player1.attack(); break;
                }
            } else {
                if (this.player1.x <= 1) {
                    this.player1.x = 1.1;
                } else if (this.player1.x >= 699 - (this.player1.frameWidth)) {
                    this.player1.x = 698.9 - (this.player1.frameWidth);
                } else if (this.player1.y <= 101) {
                    this.player1.y = 101.1;
                } else if (this.player1.y >= 599 - (this.player1.frameHeight)) {
                    this.player1.y = 598.9 - (this.player1.frameHeight);
                }
            }

            if ((this.player2.x + this.player2.speedX + this.player2.frameWidth) <= 700
                && (this.player2.x + this.player2.speedX) >= 0
                && (this.player2.y + this.player2.speedY) >= 100
                && (this.player2.y + this.player2.speedY + this.player2.frameHeight) <= 600) {
                switch (e.keyCode) {
                    case 37: this.player2.speedX -= 1; break;
                    case 39: this.player2.speedX += 1; break;
                    case 38: this.player2.speedY -= 1; break;
                    case 40: this.player2.speedY += 1; break;
                    case 16: this.player2.startFrame = 4, this.player2.endFrame = 7, this.player2.attack(); break;
                }
            } else {
                if (this.player2.x <= 1) {
                    this.player2.x = 1.1;
                } else if (this.player2.x >= 699 - (this.player2.frameWidth)) {
                    this.player2.x = 698.9 - (this.player2.frameWidth);
                } else if (this.player2.y <= 101) {
                    this.player2.y = 101.1;
                } else if (this.player2.y >= 599 - (this.player2.frameHeight)) {
                    this.player2.y = 598.9 - (this.player2.frameHeight);
                }
            }
        }
    }.bind(this);

    document.onkeyup = function (e) {
        if (this.cancelKeysIfWin == false && this.respondtoKeys == true) {
            if ([65, 68, 87, 83, 69].includes(e.keyCode)) {
                this.player1.speedX = 0;
                this.player1.speedY = 0;
                setTimeout(function () {
                    this.player1.startFrame = this.player1.initialStart;
                    this.player1.endFrame = this.player1.initialEnd;
                    if (this.player2.life <= 0) {
                        this.isOver(this.player1);
                        this.cancelKeysIfWin = true;
                        this.winnerText = 'Mike Tyson Wins!!!';
                        this.gamesWonPlayer1++;
                        console.log(this.gamesWonPlayer1);
                    }
                }.bind(this), 0);
            }
            if ([37, 38, 39, 40, 16].includes(e.keyCode)) {
                this.player2.speedX = 0;
                this.player2.speedY = 0;
                setTimeout(function () {
                    this.player2.startFrame = this.player2.initialStart;
                    this.player2.endFrame = this.player2.initialEnd;
                    if (this.player1.life <= 0) {
                        this.isOver(this.player2);
                        this.cancelKeysIfWin = true;
                        this.winnerText = 'Little Mac Wins!!!';
                        this.gameWonplayer2++;
                    }
                }.bind(this), 800);
            }
        }
    }.bind(this);
}