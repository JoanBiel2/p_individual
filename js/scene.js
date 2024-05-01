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
        this.cameras.main.setBackgroundColor(0x2b2828);

        const offsetX = 300;
        const cardWidth = 90;
        const cardHeight = 120;

        this.g_cards = this.physics.add.staticGroup();

        this.cards.forEach((card, index) => {
            const col = index % 6;
            const row = Math.floor(index / 6);
            const xPos = offsetX + col * (cardWidth + 20);
            const yPos = 90 + row * (cardHeight + 20);
            const newCard = this.g_cards.create(xPos, yPos, card.current);
            newCard.setInteractive();
            newCard.on('pointerup', () => gController.click(card));
        });
        const buttonSave = this.add.graphics();
        const buttonColor = 0x1998fa;
        buttonSave.fillStyle(buttonColor, 1);
        buttonSave.fillRect(200, 500, 160, 80);
    
        const buttonText = this.add.text(130, 120, 'Guardar', { fill: '#fff', fontSize: '24px' });
        buttonText.setOrigin(0.5);

        buttonSave.setInteractive(new Phaser.Geom.Rectangle(50, 90, 160, 80), Phaser.Geom.Rectangle.Contains);
        buttonSave.on('pointerdown', () => gController.save());

        this.updateCardsTextures();
    }
    
    updateCardsTextures() {
        this.g_cards.children.iterate((card, index) => {
            card.setTexture(this.cards[index].current);
        });
    }

    update() {
        this.g_cards.children.iterate((c, i) => c.setTexture(this.cards[i].current));
    }
}