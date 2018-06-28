function Background(game) {
    this.game = game;
    this.textXpos1 = 700;
    this.textXpos2 = 1300;
    this.dx = 5;
};

Background.prototype.lifeBarDraw = function (player) {
    if (player.life >= 0) {
        if (player.pnumber == 2) {
            this.game.ctx.fillStyle = 'lime';
            this.game.ctx.fillRect(240, 46.5, (player.life) * 1.31, 19);
        } else {
            this.game.ctx.fillStyle = 'tomato';
            this.game.ctx.fillRect(393 + 131 - (player.life) * 1.31, 46.5, (player.life) * 1.31, 20);
        }
    }
};

Background.prototype.clock = function () {
    this.game.ctx.fillStyle = 'gold';
    this.game.ctx.fillRect(559, 41, 103, 51);

    this.game.ctx.font = '23px "Press Start 2P"';
    this.game.ctx.fillStyle = 'white';

    var seconds = this.game.seconds;

    if (seconds < 10) {
        this.game.ctx.fillText('0:0' + seconds, 565, 78);
    } else if (seconds < 30) {
        this.game.ctx.fillText('0:' + seconds, 565, 78);
    } else {
        this.game.ctx.fillText('0:30', 565, 78);
        if (Math.floor(this.game.player1.life) == Math.floor(this.game.player2.life) && this.game.cancelKeysIfWin == false) {
            this.game.isOver('empate');
            this.game.cancelKeysIfWin = true;
            this.game.winnerText = 'Empate!!!'
            createjs.Sound.play('cheer');
        } else if (this.game.player1.life > this.game.player2.life && this.game.cancelKeysIfWin == false) {
            this.game.isOver(this.game.player1);
            this.game.cancelKeysIfWin = true;
            this.game.winnerText = 'Mike Tyson Wins!!!';
            this.game.gamesWonPlayer1++;
            createjs.Sound.play('cheer');
        } else if (this.game.cancelKeysIfWin == false) {
            this.game.isOver(this.game.player2);
            this.game.cancelKeysIfWin = true;
            this.game.winnerText = 'Little Mac Wins!!!';
            this.game.gamesWonPlayer2++;
            createjs.Sound.play('cheer');
        }
    }
}

Background.prototype.blocksDraw = function () {
    //round number
    this.game.ctx.fillStyle = 'black';
    this.game.ctx.fillRect(36, 37, 160, 40);
    this.game.ctx.font = '23px "Press Start 2P"';
    this.game.ctx.fillStyle = 'white';
    if (this.game.roundNumber == 4) {
        this.game.ctx.fillText('Round 3', 37, 69);//The game only has 3 rounds
    } else {
        this.game.ctx.fillText('Round ' + this.game.roundNumber, 37, 69);
    }
    //points bar
    this.game.ctx.fillStyle = '#07BCF3';
    this.game.ctx.fillRect(230, 69, 304, 23);
}

Background.prototype.pointsDraw = function (player) {
    //points left
    if (player.life < 0) {
        player.life = 0;
    }
    if (player.pnumber == 2) {
        this.game.ctx.font = '20px "Press Start 2P"';
        this.game.ctx.fillStyle = 'green';
        this.game.ctx.fillText(Math.floor(player.life), 235, 92);
    } else {
        this.game.ctx.fillStyle = 'tomato';
        this.game.ctx.fillText(Math.floor(player.life), 475, 92);
    }
}

Background.prototype.winAnimate = function () {
    this.textXpos1 -= this.dx;
    this.textXpos2 -= this.dx;
    if (this.textXpos1 < -500) {
        this.textXpos1 = 700;
    }
    if (this.textXpos2 < -500) {
        this.textXpos2 = 700;
    }
}

Background.prototype.winDraw = function (text) {
    this.game.ctx.font = '23px "Press Start 2P"';
    if (text == 'Empate!!!') {
        this.game.ctx.fillStyle = 'yellow';
    } else if (text == 'Mike Tyson Wins!!!') {
        this.game.ctx.fillStyle = 'red';
    } else {
        this.game.ctx.fillStyle = 'lime';
    }
    this.game.ctx.fillText(text, this.textXpos1, 300);
    this.game.ctx.fillText(text, this.textXpos2, 300);
}

Background.prototype.gameOverDraw = function (text) {
    this.game.ctx.font = '23px "Press Start 2P"';
    this.game.ctx.fillStyle = 'hotpink';
    this.game.ctx.shadowBlur = 10;
    this.game.ctx.shadowColor = "white";
    this.game.ctx.fillText(text, this.textXpos1, 300);
    this.game.ctx.fillText(text, this.textXpos2, 300);
}