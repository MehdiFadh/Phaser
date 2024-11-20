class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    

    preload ()
    {
        

        this.load.image('ground_1x1','dist/assets/img/ground_1x1.png');
        this.load.image('pic','dist/assets/img/spike.png');
        this.load.spritesheet('coin','dist/assets/img/coin.png',{ frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('dude','dist/assets/img/dude.png',{ frameWidth: 32, frameHeight: 48});
        
        this.load.tilemapTiledJSON('map', 'dist/assets/img/tile-collision-test.json');
    }

    create() {
        // Tout les sons disponibles


        this.infoText = this.add.text(150, 190, 'Récolter toutes les pièces pour ouvrir la porte cachée', { 
            fontSize: '20px', 
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setScrollFactor(0); // Le texte reste en place même avec la caméra qui suit

        // Faire disparaître le texte après 5 secondes
        this.time.delayedCall(5000, () => {
            this.infoText.destroy(); // Supprime le texte
        }, [], this);

        this.nbCoins = 0;

            this.nbCoinsText = this.add.text(650, 35, 'Pièces récupérées : ', { 
                fontSize: '27px', 
                fill: '#ffffff' 
            }).setScrollFactor(0);

            this.player = this.physics.add.sprite(150, 450, 'dude');

            this.player.setBounce(0.2);
            
            this.player.body.setGravityY(300);

            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', { start: 0 , end: 3}),
                frameRate: 10,
                repeat: -1

            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('dude', { start: 5 , end: 8}),
                frameRate: 10,
                repeat: -1

            });

            this.anims.create({
                key: 'turn',
                frames: this.anims.generateFrameNumbers('dude', { start: 4, end:4}),
                frameRate: 10,
                repeat: -1

            });

            this.player.body.setGravityY(300);

            
            const map = this.make.tilemap({ key: 'map' });
            var groundTiles = map.addTilesetImage('ground_1x1');
            var coinTiles = map.addTilesetImage('coin');
            var picsTiles = map.addTilesetImage('pic');
            map.createLayer('Background Layer', groundTiles, 0, 0);
            this.groundLayer = map.createLayer('Ground Layer', groundTiles, 0, 0);
            this.coinLayer = map.createLayer('Coin Layer', coinTiles, 0, 0);
            this.picLayer = map.createLayer('Pics Layer', picsTiles, 0, 0);

            // collion avec les tuiles 1 à 25 : ground_1x1
            this.groundLayer.setCollisionBetween(1,25);


            this.physics.add.collider(this.player, this.groundLayer);
        
            this.physics.add.overlap(this.player, this.coinLayer);
            this.physics.add.overlap(this.player, this.picLayer);

            // définition de la fenêtre de la caméra
            this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            // la camera suit le joueur
            this.cameras.main.startFollow(this.player);

            

            this.coinLayer.setTileIndexCallback(26, hitCoin, this);
            this.picLayer.setTileIndexCallback(32, hitPic, this);


            this.healthBar;
            this.healthBarBackground;
            this.health = 100; // Valeur initiale de la vie (peut être ajustée)
            this.healthBarWidth = 200; // Largeur initiale de la barre de vie
            this.healthBarHeight = 20; // Hauteur de la barre de vie
            this.barBackgroundColor = 0x000000; // Couleur de fond de la barre de vie
            this.barForegroundColor = 0xff0000; // Couleur de la barre de this.
            this.barWidth = 200;
            this.barHeight = 20;
            this.barBackgroundColor = 0x000000; // Couleur de fond de la barre de vie
            this.barForegroundColor = 0xff0000; // Couleur de la barre de vie

            // Barre de fond
            this.healthBarBackground = this.add.graphics();
            this.healthBarBackground.fillStyle(this.barBackgroundColor, 1);
            this.healthBarBackground.fillRect(10, 10, this.barWidth, this.barHeight);
            this.healthBarBackground.setScrollFactor(0); // Fixe la barre en haut à gauche

            // Barre de vie
            this.healthBar = this.add.graphics();
            this.healthBar.fillStyle(this.barForegroundColor, 1);
            this.healthBar.fillRect(10, 10, this.healthBarWidth, this.barHeight);
            this.healthBar.setScrollFactor(0); // Fixe la barre en haut à gauche
            
            this.nKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
            this.lKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
            this.gKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    }


    update() {
        this.cursors = this.input.keyboard.createCursorKeys();

        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-450);
        }
        if (this.input.activePointer.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-330);
        }
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-330);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(330);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if(this.nKey.isDown){
            this.nbCoins = 60;
        }
        if(this.lKey.isDown){
            this.health = 100000000;
        }
        if(this.player.y > 600 ){
            this.scene.start('Win');
        }
        if(this.gKey.isDown){
            this.scene.start('Win');
        }

    }

    

}



function hitCoin (sprite, tile)
{
    this.coinLayer.removeTileAt(tile.x, tile.y);
    this.nbCoins++;
    this.nbCoinsText.setText('Pièces récupérées : ' + this.nbCoins);
    
    if(this.nbCoins === 64){
        this.groundLayer.removeTileAt(98,17);
    }
    
}

function hitPic ()
{
    
    this.player.setTint(0xff0000); // on change la couleur du joueur en rouge
    this.player.anims.play('turn');

    this.health -= 1; // Ajustez la quantité de réduction selon vos besoins
   

    this.healthBar.clear(); // Efface l'ancien dessin
    this.healthBar.fillStyle(this.barForegroundColor, 1);
    this.healthBar.fillRect(10, 10, this.healthBarWidth * (this.health / 100), this.healthBarHeight); // Redessine la barre avec la nouvelle taille
    this.player.setTint(0xffffff)
    if (this.health < 0){
        this.physics.pause();
        this.player.setTint(0xff0000); // on change la couleur du joueur en rouge
        this.player.anims.play('turn');
        this.gameOver = true;
        
    }
}

export default Game;