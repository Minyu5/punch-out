function Player(game, src, frameWidth, frameHeight, frameSpeed, startFrame, endFrame, x, y, framesPerRow, pnumber, scale) {
    this.game = game;
    this.image = new Image();
    this.image.src = src;
    this.scale = scale;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameSpeed = frameSpeed;
    this.startFrame = startFrame;
    this.endFrame = endFrame;
    this.initialStart = startFrame;
    this.initialEnd = endFrame;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.animationSequence = [];// array holding the order of the animation
    this.currentFrame = 0;// the current frame to draw
    this.counter = 0;
    this.framesPerRow = framesPerRow;
    this.pnumber = pnumber;
    this.life = 100;
    this.attackRangeX = [0,0];
    this.attackRangeY = [0,0];
}

Player.prototype.update = function () {
    this.animationSequence = [];
    var frameNumber = this.startFrame;
    for (frameNumber; frameNumber <= this.endFrame; frameNumber++) {
        this.animationSequence.push(frameNumber);
    }
    if (this.counter == (this.frameSpeed - 1)) { // update to the next frame if it is time
        this.currentFrame = (this.currentFrame + 1) % this.animationSequence.length;
    }
    // update the counter once reaches frameSpeed
    this.counter = (this.counter + 1) % this.frameSpeed;
    // update position
    this.x += this.speedX;
    this.y += this.speedY;
}

Player.prototype.draw = function () {

    var row = Math.floor(this.animationSequence[this.currentFrame] / (this.framesPerRow));
    var col = Math.floor(this.animationSequence[this.currentFrame] % (this.framesPerRow));
    this.game.ctx.drawImage(
        this.image,
        col * this.frameWidth, row * this.frameHeight+2.5,//source image location
        this.frameWidth, this.frameHeight,
        this.x, this.y, //canvas location
        this.frameWidth * this.scale, this.frameHeight * this.scale);
    /*this.game.ctx.beginPath();
    this.game.ctx.arc(this.x+this.frameWidth * this.scale/2,this.y+this.frameHeight * this.scale,50,0,2*Math.PI);
    this.game.ctx.stroke();*/
};

Player.prototype.attack = function(){
    this.attackRangeX=[this.x-80,this.x+80];
    this.attackRangeY=[this.y-80,this.y+80];
}