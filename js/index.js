// Global Constants //
const MAIN_CONTAINER = 'main';

let mainView = new MainView(document, new GameController(new Game('Jugador1', 'Jugador2')));

document.addEventListener("DOMContentLoaded", ()=> mainView.initializeVisualComponents());