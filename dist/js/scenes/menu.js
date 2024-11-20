class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image("background","./dist/assets/img/backgroundMenu.png");
    }

    create() {

        this.add.image(400,300,'background');

        this.add.text(450,100,"Coin Master");

        this.clickButton = this.add.text(400, 200, 'Commencer la partie', { fill: '#0f0' })
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

export default Menu;