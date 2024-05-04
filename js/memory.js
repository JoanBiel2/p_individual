export var game = function(){
    const back = '../resources/back.png';
    const resources = ['../resources/cb.png', '../resources/cg.png', '../resources/co.png','../resources/cr.png','../resources/tb.png', '../resources/tg.png', '../resources/to.png','../resources/tr.png','../resources/sb.png', '../resources/sg.png', '../resources/so.png','../resources/sr.png',
    ];
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
    var dif2 = options.dif2;
    var pairs = options.pairs;
    var points = 100;
    var rondas = 0;
    var difficulty = options.dif

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
                        if (sessionStorage.mode == "normal"){
                            alert("Has guanyat amb " + points + " punts!");
                            window.location.replace("../");
                        }
                        else {
                            rondas += 1;
                            options.dif2 += 1;
                            localStorage.options = JSON.stringify(options);
                            window.location.reload()
                        }
                    }
                }
                else{
                    [card, lastCard].forEach(c=>c.goBack());
                    if (sessionStorage.mode == "normal"){
                        if (difficulty == "easy") points -=25;
                        else if (difficulty == "normal") points -=34;
                        else points -=50;
                    }
                    else {
                        points -= dif2
                    }
                    if (points <= 0){
                        alert ("Has perdut");
                        if (sessionStorage.mode == "infinit"){
                            options.ranking.push([sessionStorage.nickname,rondas])
                        }
                        window.location.replace("../");
                    }
                }
                lastCard = null;
            }
            else lastCard = card; // Primera carta
        },
        guardar: function(){
            var partida = {
                uuid: localStorage.uuid,
                pairs: pairs,
                points: points,
                dif2: dif2,
                difficulty: difficulty,
                cards: []
            };
            localStorage.save = JSON.stringify(partida);
            window.location.replace("../");
        }
    }
}();