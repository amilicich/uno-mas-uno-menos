class GameController {
    constructor(game) {
        this.game = game;
    }

    startGame() {
        this.game.currentPlayer = this.game.player1;
    }

    playerHasSelectedCard(cardPlayed) {
        this.game.cardPlayed = cardPlayed;
        this.game.currentPlayer = 'mix' + this.game.currentPlayer;
    }
}