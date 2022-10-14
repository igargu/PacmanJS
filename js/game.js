var nsGame = nsGame || {};
nsGame = {
    Game:class {

        /**
         * Constructor de la clase Game
         */
        constructor() {
            this.map = new nsMap.Map;
        }

        /**
         * Método que inicia el juego
         */
        startGame() {
            this.map.generateMap();
            //this.buttonUp();
        }

        buttonUp() {
            document.getElementById("btUp").onclick = function() {
                let map = document.getElementById("map");
                console.log(map);
            }
        }
    }
}