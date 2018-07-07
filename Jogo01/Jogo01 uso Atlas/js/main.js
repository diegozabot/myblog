var game = new Phaser.Game(600,400,Phaser.AUTO,'Jogo01',{preload:preload, create:create, update:update});

function preload(){
    game.load.atlas('space', 'assets/spaceAtlas.png', 'atlas/sprites.json');
}

function create(){
    nave = game.add.sprite(game.world.centerX,game.world.centerY,'space');
    nave.anchor.setTo(.5);
}

function update(){

}