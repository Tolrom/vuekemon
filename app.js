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
        };
    },
    
    methods: {
        reset(){
            this.sayann.health = 100;
            this.jeff.health = 100;
            this.round = 0;
        },
        attackAdversaire(){
            this.sayann.health -= (this.jeff.att - this.sayann.def);
            this.round ++;
        },
        kamehameha(){
            this.jeff.health -= (this.sayann.att - this.jeff.def);
            this.attackAdversaire();
        },
        genkidama(){
            this.jeff.health -= ((this.sayann.att * 3) - this.jeff.def);
            this.attackAdversaire();
        },
        senzu(){
            let heal = 8+Math.round(Math.random()*12);
            if(this.sayann.health < 100){
                if(!(this.sayann.health + heal > 100)){
                    this.sayann.health += heal;
                }
            }
            this.attackAdversaire();
        },
        giveUp(){
            this.sayann.health = 0;
        },
    },
    computed: {

    },
    watch: {
        'jeff.health': function(hp) {
            if(hp <= 0){
                this.jeff.health = 0;
                this.sayann.healt = 0;
                this.outcome = "VICTOIRE";
                this.colorWin = "green";
                this.end = true;
            }
        },
        'sayann.health': function(hp) {
            if(hp <= 0){
                this.jeff.health = 0;
                this.sayann.healt = 0;
                this.outcome = "DÉFAITE";
                this.colorWin = "red";
                this.end = true;
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