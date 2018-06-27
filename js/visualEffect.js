function visualEffect(game, player, src, scale) {
    this.game = game;
    this.player = player;
    this.image = new Image();
    this.image.src = src;
    this.scale = scale;
    this.image.frames = 5;
    this.image.frameIndex = 0;
    this.image.width = 611;
    this.image.height = 180;
    this.count=0;
    this.which();
}

visualEffect.prototype.which = function () {
    if (this.player.pnumber == 1) {
        this.x1 = this.player.x - 65;
        this.y1 = this.player.y;
    } else {
        this.x1 = this.player.x + 50;
        this.y1 = this.player.y - 50;
    }
}

visualEffect.prototype.update = function () {
    this.count++;
    if (this.count % 5 ==0){
    //if ((this.game.framesCounter%(60/11)) < 2) {
        if (this.image.frameIndex > 10) {
            this.image.frameIndex = 0;
            this.count=0;
        } else{
            this.image.frameIndex++;
        }
    }
    /* this.currentFrame=(this.currentFrame+1)%this.image.frames;
    if (this.currentFrame==this.image.frames){
        this.currentFrame=0;
    } */
}

visualEffect.prototype.draw = function (disp) {
    if (disp === undefined) { disp = 0;}
    this.game.ctx.drawImage(
        this.image,
        this.image.frameIndex * Math.floor(this.image.width / this.image.frames), 
        0,//source image location
        Math.floor(this.image.width / this.image.frames), 
        this.image.height,
        this.x1 + disp, 
        this.y1, //canvas location
        Math.floor(this.image.width / this.image.frames), 
        this.image.height);
};

visualEffect.prototype.clearFrame = function(){
    this.game.ctx.clearRect(this.x1, this.y1, Math.floor(this.image.width / this.image.frames), this.image.height);
}