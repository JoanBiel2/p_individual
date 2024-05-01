import { PlayScene } from "./scene.js";

var config = {
    type: Phaser.AUTO,
    donCreateContainer: true,
    width: 1200,
    height: 800,
    parent: 'game',
    scene: [PlayScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    }
}

var game = new Phaser.Game(config);


