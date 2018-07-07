var game = new Phaser.Game(600,400,Phaser.AUTO,'Jogo01',{preload:preload, create:create, update:update});

function preload(){
    game.load.image('nave','assets/images/nave1.png');
    game.load.image('asteroide','assets/images/asteroide.png');
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    nave = game.add.sprite(game.world.centerX,game.world.centerY,'nave');
    nave.anchor.setTo(.5);
    
    posicoes = [{x:150,y:100},{x:150,y:200},{x:150,y:300},
                {x:300,y:100},              {x:300,y:300},
                {x:450,y:100},{x:450,y:200},{x:450,y:300}
               ];
    
    for(i=0;i<4;i++){
        pos = game.rnd.pick(posicoes);
        asteroide = game.add.sprite(pos.x,pos.y,'asteroide');
        asteroide.anchor.setTo(.5);
        asteroide.scale.setTo(game.rnd.between(15,25)/10);
        game.physics.enable(asteroide);
        game.physics.arcade.velocityFromAngle(game.rnd.angle(),300,asteroide.body.velocity);
        
    }
}

function update(){

}