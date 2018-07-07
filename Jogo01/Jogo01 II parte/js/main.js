var game = new Phaser.Game(600,400,Phaser.AUTO,'Jogo01',{preload:preload, create:create, update:update});

function preload(){
    game.load.image('nave','assets/images/nave1.png');
    game.load.image('asteroide','assets/images/asteroide.png');
    game.load.image('bg','assets/images/background.jpg');
}

var p=0;

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.add.image(0, 0, 'bg');
    nave = game.add.sprite(game.world.centerX,game.world.centerY,'nave');
    nave.anchor.setTo(.5);
    
    nave.fuel=100;
    
    game.physics.enable(nave);
    nave.body.maxVelocity.setTo(200);
    nave.body.drag.set(70);
    
    posicoes = [{x:150,y:100},{x:150,y:200},{x:150,y:300},
                {x:300,y:100},              {x:300,y:300},
                {x:450,y:100},{x:450,y:200},{x:450,y:300}
               ];
    
    asteroides = game.add.group();
    for(i=0;i<4;i++){
        pos = game.rnd.pick(posicoes);
        asteroide = game.add.sprite(pos.x,pos.y,'asteroide',0,asteroides);
        asteroide.anchor.setTo(.5);
        asteroide.scale.setTo(game.rnd.between(15,25)/10);
        game.physics.enable(asteroide);
        game.physics.arcade.velocityFromAngle(game.rnd.angle(),300,asteroide.body.velocity);
        
    }
    
    cursors = this.input.keyboard.createCursorKeys();
    
    game.time.events.loop(Phaser.Timer.SECOND, pontos);
    
    estilo = {font: "bold 20px Arial",fill:"white"};
    pontosTxt = game.add.text(10,10,"Pontos: 0",estilo);
    pontosTxt.setShadow(3,3,'rgba(0,0,0,.5)',2);
    fuelTxt = game.add.text(100,10,"Fuel: 100",estilo);
    fuelTxt.setShadow(3,3,'rgba(0,0,0,.5)',2);
}

function pontos(){
    p++;
    pontosTxt.text ='Pontos: '+p;
}
function update(){
    game.physics.arcade.collide(nave, asteroides);
    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(nave.rotation, 300, nave.body.acceleration);
        nave.fuel-=.1;
        fuelTxt.text ='Fuel: ' + Math.floor(nave.fuel);
    }
    else
    {
        nave.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        nave.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        nave.body.angularVelocity = 300;
    }
    else
    {
        nave.body.angularVelocity = 0;
    }
    
    game.world.wrap(nave);
    
    asteroides.forEach(function(a){
        game.world.wrap(a);
    });
}