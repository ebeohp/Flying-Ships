//For some reason, the hitEnemy physics isnt working so uh I'm skipping how to make the ship respawn and stuff after it gets hit. Check Phaser 3 tutorial part 11 by animuz for respawns mainly. I'll be moving on to learn how to add audio.

class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }
    
    create(){ //Everything that is here from assets were preloaded on the Scene1.js code. 
        this.background=this.add.tileSprite(0,0,config.width, config.height, "background"); //TileSprite is different from images!
        this.background.setOrigin(0,0); //So its easier to move the background relating to it's top left corner.
      
        
        
        //new declarations using sprite.
        this.ship1 = this.add.sprite(config.width/2 - 50, config.height/2, "ship"); 
        this.ship2 = this.add.sprite(config.width/2, config.height/2, "ship2");
        this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2, "ship3");
        
       
        
        this.powerUps = this.physics.add.group(); //adding physics for this
        var maxObjects = 4;
        for(var i = 0; i<=maxObjects; i++)
        {
            var powerUp = this.physics.add.sprite(16,16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0,0, game.config.width, game.config.height);
            if(Math.random() > 0.5){
                powerUp.play("red");
            }else{
                powerUp.play("gray");
            }
        
            powerUp.setVelocity(100,100);
            powerUp.setCollideWorldBounds(true); //stop them from leaving the area
            powerUp.setBounce(1); //bounce off the edges of the area
        }
        
        
        this.ship1.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");
        
        //Enable them all to recieve input/
        this.ship1.setInteractive(); 
        this.ship2.setInteractive();
        this.ship3.setInteractive();
        
        this.input.on('gameobjectdown', this.destroyShip, this);// TRY THIS FOR MOUSE INPUT CLICKING
        
        
       
        this.player = this.physics.add.sprite(config.width/2 - 8, config.height - 64, "player");
        this.player.play("thrust");
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);
        
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.projectiles = this.physics.add.group(); //holds all the beams
        
        this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp) {
            projectile.destroy();
        });

    }
    
        
    
    update(){
        this.moveShip(this.ship1, 1); //These are here so that the method call lets the ship continue to move.
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 3);
        //this.ship1.angle+=3; //Makes them spinnnn.
        this.background.tilePositionY-= 0.5; //This moves the background image.
        
        this.movePlayerManager();
        
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.shootBeam();
        }
        for(var i = 0; i<this.projectiles.getChildren().length; i++){ //iterate through each beam in the group and tell it to self destruct since it doesnt automatically update in the beam class. 
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }
    }
    
    movePlayerManager(){
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);   
        }else if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
        }else{
            this.player.setVelocityX(0);
        }
        
        if(this.cursorKeys.up.isDown){ //gameSettings is in game.js
           this.player.setVelocityY(-gameSettings.playerSpeed);
        }else if(this.cursorKeys.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
        }else{
            this.player.setVelocityY(0);
        }
    }
    
    moveShip(ship, speed){ //This makes the ships move at their own velocities down the page.
        ship.y += speed;    
        if(ship.y>config.height){ //If the ship's y position exceeds the bottom of the game screen, something must be done...
            this.resetShipPos(ship);   
        }
    }
    shootBeam(){
        var beam = new Beam(this);
    }
    resetShipPos(ship){ //This helps bring the ship back to the top of the game at a random X position.
        ship.y = 0;
        var randomX = Phaser.Math.Between(0, config.width);
        ship.x= randomX;
    }
    destroyShip(pointer, gameObject){
        gameObject.setTexture("explosion");
        gameObject.play("explode");
        projectiles.destroy();
     
    }
    
    
    
}