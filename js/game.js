var nsGame = nsGame || {};
nsGame = {
    Game:class {

        /**
         * Constructor de la clase Game
         */
        constructor() {
            this.map = new nsMap.Map;
            this.interval = null;
        }

        /**
         * Método que inicia el juego
         */
        startGame() {
            const map = this.map.generateMap();

            let isGameStart = false;
            let button = document.createElement("button");
            button.setAttribute("id", "btStart");
            button.appendChild(document.createTextNode("INICIAR PARTIDA"));
            document.getElementById("message").appendChild(button);
            button.onclick = () => {
                document.getElementById("btStart").setAttribute("hidden", "hidden");

                document.getElementById("btUp").onclick = () => { this.movements(map, "O", "A", 0) }
                document.getElementById("btLeft").onclick = () => { this.movements(map, "O", "A", 1) }
                document.getElementById("btRight").onclick = () => { this.movements(map, "O", "A", 2) }
                document.getElementById("btDown").onclick = () => { this.movements(map, "O", "A", 3) }

                this.enemyMovements(map);
            }

            if (isGameStart) {
                
            }
        }

        /**
         * Método que finaliza el juego
         */
        finishGame() {
            document.getElementById("btUp").onclick = null;
            document.getElementById("btLeft").onclick = null;
            document.getElementById("btRight").onclick = null;
            document.getElementById("btDown").onclick = null;

            let message = document.getElementById("message");
            message.appendChild(document.createTextNode("FIN DE LA PARTIDA"));

            document.getElementById("message").appendChild(document.createElement("br"));

            let button = document.createElement("button");
            button.appendChild(document.createTextNode("VOLVER A JUGAR"));
            document.getElementById("message").appendChild(button);
            button.onclick = function() {
                location.reload();
            }
        }

        /**
         * Método que devuelve las coordenadas del personaje 
         * que le indiquemos
         * 
         * @param {array} map Mapa del juego
         * @param {string} character Personaje que queremos encontrar 
         * @returns Coordenadas del personaje
         */
        foundCharacterPosition(map, character) {
            const positions = [];
            for(let i = 0; i < map.length; i++) {
                for(let j = 0; j < map[i].length; j++) {
                    if(map[i][j] == character) {
                        positions[0] = i;
                        positions[1] = j;
                    }
                }
            }
            return positions;
        }

        /**
         * Método que mueve el personaje que le indiquemos 
         * en la dirección seleccionada
         * 
         * @param {array} map Mapa del juego
         * @param {*} character Personaje que deseamos mover
         * @param {*} enemy Enemigo del personaje que vamos a mover
         * @param {*} movement Movimiento que queremos realizar
         */
        movements(map, character, enemy, movement) {
            const positions = this.foundCharacterPosition(map, character);
            let positionX = positions[0];
            let positionY = positions[1];
            let position, maxPosition, newPositionX, newPositionY;

            switch(movement) {
                case 0: {
                    position = 0;
                    maxPosition = positionX;
                    newPositionX = positionX-1;
                    newPositionY = positionY;
                    break;
                }
                case 1: {
                    position = 0;
                    maxPosition = positionY;
                    newPositionX = positionX;
                    newPositionY = positionY-1;
                    break;
                }
                case 2: {
                    position = positionY;
                    maxPosition = map[0].length;
                    newPositionX = positionX;
                    newPositionY = positionY+1;
                    break;
                }
                case 3: {
                    position = positionX;
                    maxPosition = map.length-1;
                    newPositionX = positionX+1;
                    newPositionY = positionY;
                    break;
                }
            }

            if(position < maxPosition && map[newPositionX][newPositionY] == "X") {
                document.getElementById("map").remove();
                map[positionX][positionY] = "X";
                map[newPositionX][newPositionY] = character;
                this.map.drawMap(map);
            } else if(position < maxPosition && map[newPositionX][newPositionY] == enemy) {
                document.getElementById("map").remove();
                map[positionX][positionY] = "X";
                if(character == "A"){ map[newPositionX][newPositionY] = character }
                this.map.drawMap(map);
                this.finishGame();
                clearInterval(this.interval);
            }
        }

        /**
         * Método que mueve al enemigo cada medio segundo en 
         * una dirección aleatoria
         * 
         * @param {array} map Mapa del juego
         */
        enemyMovements(map) {
            this.interval = setInterval(() => {
                let move = Math.floor(Math.random() * 4);
                this.movements(map, "A", "O", move);
            }, 500);
        }
    }
}