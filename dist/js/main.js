import Menu from "./scenes/menu.js";
import Game from "./scenes/game.js";
import Win from "./scenes/win.js";

window.config = {
    width: 1024,
    height: 576,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    type: Phaser.AUTO,
    scene: [Menu, Game, Win],
    backgroundColor: '#2d2d2d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: false
        }
    },
};

const game = new Phaser.Game(window.config);