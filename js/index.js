$(document).ready(function () {
    var game = new Game("canvas");
    loadSound();
    
    $('.play').click(function () {
        createjs.Sound.play('button');
        $('#menu').hide();
        $('#howToPlay').css('display', 'flex');
        setTimeout(function () {
            $('#howToPlay').hide();
            $('#canvas').show();
            game.startGame();
        }, 4000)
    });

    $('.restart').click(function () {
        createjs.Sound.play('button');
        $('#game-over').hide();
        setTimeout(function(){
            location.reload();
        }, 500)
    });
});

function loadSound() {
    if (!createjs.Sound.initializeDefaultPlugins()) {
        return;
    }
    var assetsPath = "./sounds/";
    var sounds = [
        { src: "punch.mp3", id: 'punch' },
        { src: "cheer.mp3", id: 'cheer' },
        { src: "bell.mp3", id: 'bell' },
        { src: "button.mp3", id: 'button'},
        { src: "backgroundmusic.mp3", id: 'backgroundmusic'}
    ];
    createjs.Sound.registerSounds(sounds, assetsPath); 
    var bgAudio = new Audio('sounds/backgroundmusic.mp3');
    bgAudio.play();
}