export var game = function(){
    const back = '../resources/back.png';
    const resources = ['../resources/sr.png','../resources/sg.png','../resources/tr.png','../resources/tg.png','../resources/cr.png','../resources/cg.png','../resources/cb.png', '../resources/co.png', '../resources/sb.png','../resources/so.png', '../resources/tb.png','../resources/to.png'];
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
            if (difficulty == "easy"){
                setTimeout(() => {
                this.current = back;
                this.clickable = true;
                this.callback();
                }, 1000);
            }
            else if (difficulty == "normal"){
                setTimeout(() => {
                    this.current = back;
                    this.clickable = true;
                    this.callback();
                    }, 500);
            }
            else{
                setTimeout(() => {
                    this.current = back;
                    this.clickable = true;
                    this.callback();
                    }, 100);
            }
        },
        goFront: function (){
            this.current = this.front;
            this.clickable = false;
            this.callback();
        }
    };
    
    var options = JSON.parse(localStorage.options||JSON.stringify(default_options));
    var lastCard;
    var pairs = options.pairs;
    var points = 100;
    var difficulty = options.difficulty

    return {
        init: function(call) {
            var items = resources.slice(); // Copiem l'array
            items.sort(() => Math.random() - 0.5); // Aleatòria
            items = items.slice(0, pairs); // Agafem els primers
            items = items.concat(items);
            items.sort(() => Math.random() - 0.5); // Aleatòria
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
                    if (difficulty == "easy") points -=25;
                    else if (difficulty == "normal") points -=34;
                    else points -=50;
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