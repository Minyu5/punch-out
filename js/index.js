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

    $('.sound').click(function(){
        $(this).toggleClass('sound-on sound-off');
        if ($(this).hasClass('sound-off')){
            bgAudio.pause();
        } else {
            bgAudio.play();
        }
    })

    $('.restart').click(function () {
        createjs.Sound.play('button');
        $('#game-over').hide();
        setTimeout(function(){
            location.reload();
        }, 500)
    });
});

var instance;

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
        //{ src: "backgroundmusic.mp3", id: 'backgroundmusic'}
    ];
    createjs.Sound.registerSounds(sounds, assetsPath); 
    bgAudio = new Audio('sounds/backgroundmusic.mp3');
    bgAudio.play();
    bgAudio.loop=true;
}
var bgAudio;