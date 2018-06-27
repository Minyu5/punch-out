$(document).ready(function () {
    var game = new Game("canvas");

    $('.play').click(function () {
        $('#menu').hide();
        $('#howToPlay').css('display', 'flex');
        setTimeout(function(){
            $('#howToPlay').hide();
            $('#canvas').show();
            game.startGame();
        }, 4000)
    });
});