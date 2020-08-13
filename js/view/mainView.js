class MainView {
    constructor(document, gameController) {
        this.document = document;
        this.gameController = gameController;
    }

    playerClick(player) {
        document.getElementById(player).style.display = "none";
        document.getElementById(`${player}Input`).style.display = "block";
    }

    updateVisualComponents() {
        document.getElementById("player1").textContent = this.gameController.game.player1;
        document.getElementById("player2").textContent = this.gameController.game.player2;
        document.getElementById("score1").textContent = this.gameController.game.score1;
        document.getElementById("score2").textContent = this.gameController.game.score2;
    }


    resetVisualComponents() {
        document.getElementById('specialCard' + this.gameController.game.valueSelected).className = 'specialCard btn btn-outline-secondary';
        document.getElementById('answer').value = '';
        document.getElementById("play").style.display = "inline-block";
        document.getElementById("play").textContent = "Elige carta";
        document.getElementById('answer').style.display = "none";

        if (this.gameController.game.currentPlayer.includes(this.gameController.game.player1)) {
            document.getElementById("play").className = "btn btn-primary";
        } else if(this.gameController.game.currentPlayer.includes(this.gameController.game.player2)) {
            document.getElementById("play").className = "btn btn-danger";
        } 
        
    }

    startGameVisual() {
        document.getElementById("startGame").style.display = "none";
        document.getElementById("score1").style.display = "block";
        document.getElementById("score2").style.display = "block";
        document.getElementById("play").style.display = "inline-block";

        this.gameController.startGame();
    }

    playGame() {
        if(this.gameController.game.currentPlayer.includes("mix")) {

            let cardSelected = this.gameController.game.randomValues[Math.floor(Math.random() * this.gameController.game.randomValues.length)];

            this.gameController.game.valueSelected = cardSelected;

            if (this.gameController.game.currentPlayer.includes(this.gameController.game.player1)) {
                this.gameController.game.currentPlayer = 'play' + this.gameController.game.player2;
            } else if(this.gameController.game.currentPlayer.includes(this.gameController.game.player2)) {
                this.gameController.game.currentPlayer = 'play' + this.gameController.game.player1;
            } 

            document.getElementById('specialCard' + cardSelected).className = 'specialCard btn ' + this.colorPlayer();
            document.getElementById('play').style.display = "none";
            document.getElementById('answer').style.display = "inline-block";
            document.getElementById('answer').style.width = "120px";
            console.log(cardSelected);
        }
    }

    initializeVisualComponents() {
        let that = this;

        document.getElementById("player1").addEventListener("click", ()=> this.playerClick("player1"));

        document.getElementById("player2").addEventListener("click", ()=> this.playerClick("player2"));

        document.getElementById("startGame").addEventListener("click", ()=> this.startGameVisual());

        document.getElementById("play").addEventListener("click", ()=> this.playGame());

        document.getElementById("answer").addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();

                let result = that.gameController.game.cardPlayed + that.gameController.game.valueSelected;
                
                if(parseInt(this.value) == result) {
                    if (that.gameController.game.currentPlayer.includes(that.gameController.game.player1)) {
                        that.gameController.game.score1 += 1;
                    } else if(that.gameController.game.currentPlayer.includes(that.gameController.game.player2)) {
                        that.gameController.game.score2 += 1;
                    } 
                }

                if (that.gameController.game.currentPlayer.includes(that.gameController.game.player1)) {
                    that.gameController.game.currentPlayer = that.gameController.game.player1;
                } else if(that.gameController.game.currentPlayer.includes(that.gameController.game.player2)) {
                    that.gameController.game.currentPlayer = that.gameController.game.player2;
                } 

                that.updateVisualComponents();
                that.resetVisualComponents();
            }
        });

        document.getElementById("player1Input").addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                that.gameController.game.player1 = document.getElementById("player1Input").value;
                document.getElementById("player1Input").style.display = "none";
                document.getElementById("player1").style.display = "block";
                that.updateVisualComponents();
            }
        });

        document.getElementById("player2Input").addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                that.gameController.game.player2 = document.getElementById("player2Input").value;
                document.getElementById("player2Input").style.display = "none";
                document.getElementById("player2").style.display = "block";
                that.updateVisualComponents();
            }
        });

        let table = document.createElement('table');
        table.classList.add('table');
        
        let acumulador = 1;
        let row;
        for (let index = 1; index <= mainView.gameController.game.cardsCount; index++) {
            if(acumulador == 1) {
                row = table.insertRow();
            }
            let cell = row.insertCell();
            cell.innerHTML = `<button id='gameCard${index}' type="button" class="gameCard btn btn-outline-dark" onclick='mainView.gameCardPlayed(${index});'>${index}</button>`;
            
            acumulador = acumulador == 10 ? 1 : acumulador + 1;
        }

        let tableSpecialCards = document.createElement('table');

        tableSpecialCards.classList.add('tableSpecialCard');

        tableSpecialCards.classList.add('table');

        let tableSpecialWidth = 0;
        
        let specialCardsRow = tableSpecialCards.insertRow();

        this.gameController.game.randomValues.forEach(element => {
            tableSpecialWidth += 100;
            let cell = specialCardsRow.insertCell();
            cell.innerHTML = `<button id='specialCard${element}' type="button" class="specialCard btn btn-outline-secondary"'>${element}</button>`;
        });

        tableSpecialCards.style.width = tableSpecialWidth + 'px';
    
        document.getElementById(MAIN_CONTAINER).appendChild(table);
        document.getElementById(MAIN_CONTAINER).appendChild(tableSpecialCards);
    }

    gameCardPlayed(gameCard) {

        let btnClass = this.nextPlayer();

        let card = document.getElementById('gameCard' + gameCard);
    
        if(btnClass && card.className == 'gameCard btn btn-outline-dark') {
            card.className = 'gameCard btn ' + btnClass;
            this.gameController.playerHasSelectedCard(gameCard);
            document.getElementById('play').textContent = 'Mezclar ';
        }
        console.log(gameCard);
    }

    nextPlayer() {
        if (this.gameController.game.currentPlayer == this.gameController.game.player1) {
            return 'btn-primary';
        } else if(this.gameController.game.currentPlayer == this.gameController.game.player2) {
            return 'btn-danger';
        }
    }

    colorPlayer() {
        if (this.gameController.game.currentPlayer.includes(this.gameController.game.player1)) {
            return 'btn-primary';
        } else if(this.gameController.game.currentPlayer.includes(this.gameController.game.player2)) {
            return 'btn-danger';
        }
    }
}