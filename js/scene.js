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
        const button = this.add.graphics();
        const color = 0x4672ec;
        button.fillStyle(color, 1);
        button.fillRect(65, 90, 130, 50);
    
        const buttonText = this.add.text(130, 120, 'Guardar', { fill: '#fff', fontSize: '24px' });
        buttonText.setOrigin(0.5);

        button.setInteractive(new Phaser.Geom.Rectangle(50, 90, 160, 80), Phaser.Geom.Rectangle.Contains);
        button.on('pointerdown', () => gController.guardar());

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