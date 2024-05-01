import { game as gController } from "./memory.js";

export class PlayScene extends Phaser.Scene{
    constructor (){
        super('PlayScene');
        this.resources = [];
        this.cards = gController.init(()=>null); // Inicialitzar cartes
    }

    preload() {  
        this.cards.forEach((r)=>{
            if (!this.resources.includes(r.front))
                this.resources.push(r.front);
        });
        this.resources.push("../resources/back.png");
        this.resources.forEach((r)=>this.load.image(r,r)); // Primer paràmetre nom Segon paràmetre direcció
    }

    create() {
        this.cameras.main.setBackgroundColor(0xBFFCFF);
        var offset_x = 300;
        var x = Math.trunc((this.game.config.width-(offset_x*2)) / 100);
        this.g_cards = this.physics.add.staticGroup();
        this.cards.forEach((c, i)=>{ 
            this.g_cards.create(offset_x + 45 + (Math.trunc(i%x))*100, 90 + (Math.trunc(i/x)) * 150, c.current)
        });

        this.g_cards.children.iterate((c, i) => {
            c.setInteractive();
            c.on('pointerup', ()=> gController.click(this.cards[i]));
        });
            
        var buttonSave = this.add.graphics();
        var buttonColor = 0x1998fa;
        buttonSave.fillStyle(buttonColor, 1);
        buttonSave.fillRect(50, 90, 160, 80);
        var buttonText = this.add.text(130, 120, 'SAVE', { fill: '#fff', fontSize: '24px' });
        buttonText.setOrigin(0.5);
        buttonSave.setInteractive(new Phaser.Geom.Rectangle(50, 90, 160, 80), Phaser.Geom.Rectangle.Contains);
        buttonSave.on('pointerdown', ()=> gController.save());
    }

    update() {
        this.g_cards.children.iterate((c, i) => c.setTexture(this.cards[i].current));
    }
}