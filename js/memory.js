export var game = function(){
    const back = '../resources/back.png';
    const resources = ['../resources/cb.png', '../resources/co.png', '../resources/sb.png','../resources/so.png', '../resources/tb.png','../resources/to.png'];
    const card = {
        current: back,
        clickable: true,
        goFrontone: function () {
            setTimeout(() => {
                this.goFront();
                this.clickable = false;
                this.callback();
                setTimeout(() => {
                    this.goBack();
                }, 1000);
            }, 0);
        },
        goBack: function (){
            setTimeout(() => {
                this.current = back;
                this.clickable = true;
                this.callback();
            }, 1000);
        },
        goFront: function (){
            this.current = this.front;
            this.clickable = false;
            this.callback();
        }
    };

    var lastCard;
    var pairs = 2;
    var points = 100;

    return {
        init: function(call) {
            var items = resources.slice(); // Copiamos el array
            items.sort(() => Math.random() - 0.5); // Aleatoria
            items = items.slice(0, pairs); // Tomamos los primeros
            items = items.concat(items);
            items.sort(() => Math.random() - 0.5); // Aleatoria
            var createdCards = items.map(item => Object.create(card, {front: {value: item}, callback: {value: call}}));
            createdCards.forEach(card => card.goFrontone());
        
            return createdCards;
        },
        click: function (card){
            if (!card.clickable) return;
            card.goFront();
            if (lastCard){ // Segona carta
                if (card.front === lastCard.front){
                    pairs--;
                    if (pairs <= 0){
                        alert("Has guanyat amb " + points + " punts!");
                        window.location.replace("../");
                    }
                }
                else{
                    [card, lastCard].forEach(c=>c.goBack());
                    points-=25;
                    if (points <= 0){
                        alert ("Has perdut");
                        window.location.replace("../");
                    }
                }
                lastCard = null;
            }
            else lastCard = card; // Primera carta
        }
    }
}();