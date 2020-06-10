class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene){ //reference
        var x = scene.player.x; //locations are from the reference 
        var y = scene.player.y;
        
        super(scene, x, y, "beam"); //because we are inheriting from Sprite, this way we can use the texture of the beam for our sprite. Also, every instantiation will put the beam right where the ship is... Seems like I can definitely use this for smokey bird's chimneys.
        scene.add.existing(this); //adds Game object.. if only the code up to this point is implemented, the beams will stay in one place. Maybe I can  try doing this for a tree planting game
        
        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = - 250; //velocity so it goes upwards
    }
    update(){
        if(this.y<32){
            this.destroy(); //self destructing beams after they have crossed the top of the game.
        }
            
        
    }
}