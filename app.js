Vue.createApp({

    data(){
        return {
            round: 0,
            outcome: '',
            colorWin: '',
            end: false,
            jeff: {
                health: 100,
                att:20+(Math.round(Math.random()*5)),
                def:5+(Math.round(Math.random()*5)),
            },
            sayann: {
                health: 100,
                att:10+(Math.round(Math.random()*10)),
                def:5+(Math.round(Math.random()*5)),
            },
            special: false,
            battleLogs: [],
        };
    },
    
    methods: {
        reset(){
            this.sayann.health = 100;
            this.jeff.health = 100;
            this.round = 0;
            this.end = false;
            this.outcome = '';
            this.battleLogs = [];
        },
        attackAdversaire(){
            this.battleLogs.push("Jeff Pizza se jette sur Sayann ! Il lui inflige "+this.jeff.att+" points de dégats")
            let crit = Math.round(Math.random()*100)
            if(crit >= 95){
                this.battleLogs.push("Coup critique! Impossible pour Sayann de se défendre!");
                this.sayann.health -= this.jeff.att;
            }
            else {
                this.battleLogs.push("Sayann se défend! Il réduit les dégats de "+this.sayann.def);
                this.sayann.health -= (this.jeff.att - this.sayann.def);
                this.round ++;
            }
        },
        kamehameha(){
            this.battleLogs.push("Sayann envoie un Kamehameha sur son adversaire! Il lui inflige "+this.sayann.att+" dégats !");
            let crit = Math.round(Math.random()*100);
            if(crit >= 95){
                this.battleLogs.push("Coup critique! Impossible pour Jeff Pizza de se défendre!");
                this.jeff.health -= this.sayann.att;
            }
            else{
                this.battleLogs.push("Jeff Pizza se défend! Il réduit les dégats de "+this.jeff.def);
                this.jeff.health -= (this.sayann.att - this.jeff.def);
            }
            this.attackAdversaire();
        },
        genkidama(){
            this.battleLogs.push("Sayann envoie un Genkidama sur son adversaire! Il lui inflige "+this.sayann.att * 3+" dégats !");
            let crit = Math.round(Math.random()*100);
            if(crit >= 95){
                this.battleLogs.push("Coup critique! Impossible pour Jeff Pizza de se défendre!");
                this.jeff.health -= (this.sayann.att*3);
            }else {
                this.battleLogs.push("Jeff Pizza se défend! Il réduit les dégats de "+this.jeff.def);
                this.jeff.health -= ((this.sayann.att * 3) - this.jeff.def);
            }
            this.attackAdversaire();
        },
        senzu(){
            let heal = 15+Math.round(Math.random()*12);
            if(this.sayann.health < 100){
                if(!(this.sayann.health + heal > 100)){
                    this.sayann.health += heal;
                }
            }
            this.battleLogs.push("Sayann mange un senzu! Il récupère "+heal+" hp !");
            this.attackAdversaire();
        },
        giveUp(){
            this.sayann.health = 0;
            this.battleLogs.push("Sayann a abandonné pour laisser son fils prendre le relais!");
        },
    },
    computed: {

    },
    watch: {
        'jeff.health': function(hp) {
            if(hp <= 0){
                this.jeff.health = 0;
                this.outcome = "VICTOIRE";
                this.colorWin = "green";
                this.end = true;
                this.battleLogs.push("Sayann a triomphé de son adversaire !");
            }
        },
        'sayann.health': function(hp) {
            if(hp <= 0){
                this.sayann.health = 0;
                this.outcome = "DÉFAITE";
                this.colorWin = "red";
                this.end = true;
                this.battleLogs.push("Sayann a échoué, la terre court un grand danger !");
            }
        },
        round(round){
            if(round%3 == 0){
                this.special = false;
            }
            else {
                this.special = true;
            }
        },
    },
    }).mount('#app');