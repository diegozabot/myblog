var game = new Phaser.Game(600,400,Phaser.AUTO,'Jogo01',{preload:preload, create:create, update:update});

function preload(){
    game.load.spritesheet('nave','assets/images/naveAnim.png',24,15);
    game.load.spritesheet('explosao','assets/images/explosaoAnim.png',15,15);
    game.load.image('asteroide','assets/images/asteroide.png');
    game.load.image('bg','assets/images/background.jpg');
    game.load.image('comb','assets/images/combustivel.png');
}

var p=0;

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.add.image(0, 0, 'bg');
    nave = game.add.sprite(game.world.centerX,game.world.centerY,'nave');
    explosao = game.add.sprite(-50,-50,'explosao');
    explosao.scale.setTo(2);
    explosao.animations.add('explosao',[0,1,2,3], 5, false);
    explosao.anchor.setTo(.5);
    
    nave.anchor.setTo(.5);
    nave.animations.add('gas',[1,2], 10, false);
    nave.fuel=100;
    
    game.physics.enable(nave);
    nave.body.maxVelocity.setTo(200);
    nave.body.drag.set(70);
    
    posicoes = [{x:150,y:100},{x:150,y:200},{x:150,y:300},
                {x:300,y:100},              {x:300,y:300},
                {x:450,y:100},{x:450,y:200},{x:450,y:300}
               ];
    
    pos = game.rnd.pick(posicoes);
    comb = game.add.sprite(pos.x,pos.y,'comb');
    comb.anchor.setTo(.5);
    comb.scale.setTo(2);
    game.physics.enable(comb);
    game.physics.arcade.velocityFromAngle(game.rnd.angle(),50,comb.body.velocity);
    
    asteroides = game.add.group();
    for(i=0;i<4;i++){
        pos = game.rnd.pick(posicoes);
        asteroide = game.add.sprite(pos.x,pos.y,'asteroide',0,asteroides);
        asteroide.anchor.setTo(.5);
        asteroide.scale.setTo(game.rnd.between(15,25)/10);
        game.physics.enable(asteroide);
        game.physics.arcade.velocityFromAngle(game.rnd.angle(),200,asteroide.body.velocity);
        asteroide.body.bounce.setTo(2);
        
    }
    
    cursors = this.input.keyboard.createCursorKeys();
    
    game.time.events.loop(Phaser.Timer.SECOND, pontos);
    
    estilo = {font: "bold 20px Arial",fill:"white"};
    pontosTxt = game.add.text(10,10,"Pontos: 0",estilo);
    pontosTxt.setShadow(3,3,'rgba(0,0,0,.5)',2);
    fuelTxt = game.add.text(590,10,"Fuel: 100",estilo);
    fuelTxt.anchor.setTo(1,0);
    fuelTxt.setShadow(3,3,'rgba(0,0,0,.5)',2);
}

function pontos(){
    p++;
    pontosTxt.text ='Pontos: '+p;
}
function update(){
    game.physics.arcade.collide(nave, asteroides, colisao);
    game.physics.arcade.overlap(nave, comb, carrega);
    if (cursors && cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(nave.rotation, 300, nave.body.acceleration);
        nave.fuel-=.1;
        fuelTxt.text ='Fuel: ' + Math.floor(nave.fuel);
        nave.animations.play('gas');
        testEndgame();
    }
    else
    {
        nave.body.acceleration.set(0);
        nave.frame=2;
    }

    if (cursors && cursors.left.isDown)
    {
        nave.body.angularVelocity = -200;
    }
    else if (cursors && cursors.right.isDown)
    {
        nave.body.angularVelocity = 200;
    }
    else
    {
        nave.body.angularVelocity = 0;
    }
    
    game.world.wrap(nave);
    game.world.wrap(comb);
    
    asteroides.forEach(function(a){
        game.world.wrap(a);
    });
}
function colisao(){
    nave.fuel-=10;
    fuelTxt.text ='Fuel: ' + Math.floor(nave.fuel);
    testEndgame();
    
}
function carrega(){
    nave.fuel+=10;
    fuelTxt.text ='Fuel: ' + Math.floor(nave.fuel);
    pos = game.rnd.pick(posicoes);
    comb.position.setTo(pos.x,pos.y);
    game.physics.arcade.velocityFromAngle(game.rnd.angle(),50,comb.body.velocity);
}
function testEndgame(){
    if(nave.fuel<0){
        //nave.body.angularVelocity = 0;
        console.log("explodindo");
        nave.kill();
        explosao.position.setTo(nave.x,nave.y);
        explosao.animations.play("explosao");
        cursors = null;
    }
}