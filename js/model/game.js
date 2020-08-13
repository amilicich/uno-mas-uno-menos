class Game {
    constructor(player1, player2) {
        this.currentPlayer = '';
        this.cardsCount = 50;
        this.randomValues = [-1, 1];
        this.valueSelected = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.score1 = 0;
        this.score2 = 0;
        this.cardPlayed = 0;
    }
}