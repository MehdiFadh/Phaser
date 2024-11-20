class Win extends Phaser.Scene {
    constructor() {
        super('Win');
    }

    preload() {
        this.load.image("background","./dist/assets/img/backgroundMenu.png");
    }

    create() {

        this.add.image(400,300,'background');

        this.add.text(30,50,"Vous avez gagner", 
            {fill: '#ff0000', fontSize: '100px'
        });

        this.clickButton = this.add.text(400, 300, 'Recommencer une partie', { fill: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('Game');
            });

        
    }

    update(time, delta) {
    }

    buttonClickDown() {
        this.scene.start('Game');
    }

    enterButtonHoverState() {
        this.clickButton.setStyle({ fill: '#ff0'});
    }

    enterButtonRestState() {
        this.clickButton.setStyle({ fill: '#0f0' });
    }
}

export default Win;