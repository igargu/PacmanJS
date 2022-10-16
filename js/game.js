var nsGame = nsGame || {};
nsGame = {
    Game:class {

        /**
         * Constructor de la clase Game
         */
        constructor() {
            this.map = new nsMap.Map;
            this.interval = null;
            this.isGameFinished = false;
        }

        /**
         * Método que inicia el juego
         */
        startGame() {
            const maps = this.map.generateMap();
            var map = maps[0];
            var numMap = 0;

            let button = document.createElement("button");
            button.setAttribute("id", "btStart");
            button.appendChild(document.createTextNode("INICIAR PARTIDA"));
            document.getElementById("message").appendChild(button);
            button.onclick = () => {
                document.getElementById("btStart").setAttribute("hidden", "hidden");

                document.addEventListener("keydown", (event) => {
                    if (!this.isGameFinished) {
                        switch(event.key) {
                        case "w":
                            this.movements(maps, map, "O", "A", 0)
                            break;
                        case "a":
                            this.movements(maps, map, "O", "A", 1)
                            break;
                        case "d":
                            this.movements(maps, map, "O", "A", 2)
                            break;
                        case "s":
                            this.movements(maps, map, "O", "A", 3)
                            break;
                        case "Enter":
                            if(map[map.length-1][map[0].length-1] == "O") {
                                if (numMap == 0) {
                                    numMap = 1;
                                } else {
                                    numMap = 0;
                                }
                                map = this.changeMap(maps, map, numMap);
                                this.enemyMovements(maps, map);
                            }
                            break;
                        }
                    }
                });

                this.enemyMovements(maps, map);
            }
        }

        /**
         * Método que finaliza el juego
         */
        finishGame(msg) {
            this.isGameFinished = true;

            let message = document.getElementById("message");
            message.appendChild(document.createTextNode("FIN DE LA PARTIDA: " + msg));
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
        movements(maps, map, character, enemy, movement) {
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

            if(position < maxPosition && ( map[newPositionX][newPositionY] == "X" 
                || map[newPositionX][newPositionY] == "S" || map[newPositionX][newPositionY] == "G" )) {
                document.getElementById("map").remove();
                if(map[map.length-1][map[0].length-1] == "O" && character == "O") {
                    map[positionX][positionY] = "S";
                } else if(character == "O") {
                    map[positionX][positionY] = "G";
                } else if(character == "A") {
                    if (map[newPositionX][newPositionY] == "X") {
                        map[positionX][positionY] = "X";
                    } else {
                        map[positionX][positionY] = "G";
                    }
                }
                map[newPositionX][newPositionY] = character;
                let balls = "Remaining gems: " + this.countGems(maps);
                document.getElementById("gems").innerHTML = balls;
                if (this.countGems(maps) == '0') {
                    this.finishGame("HAS GANADO");
                    clearInterval(this.interval);
                }
                this.map.drawMap(map);
            } else if(position < maxPosition && map[newPositionX][newPositionY] == enemy) {
                document.getElementById("map").remove();
                if(character == "A"){ map[newPositionX][newPositionY] = character }
                if (map[newPositionX][newPositionY] == "X") {
                    map[positionX][positionY] = "X";
                } else {
                    map[positionX][positionY] = "G";
                }
                this.map.drawMap(map);
                this.finishGame("HAS PERDIDO");
                clearInterval(this.interval);
            }
        }

        /**
         * Método que mueve al enemigo cada medio segundo en 
         * una dirección aleatoria
         * 
         * @param {array} map Mapa del juego
         */
        enemyMovements(maps, map) {
            this.interval = setInterval(() => {
                let move = Math.floor(Math.random() * 4);
                this.movements(maps, map, "A", "O", move);
            }, 500);
        }

        /**
         * Método que cambia el mapa que se juega
         * 
         * @param {array} maps Mapas del juego
         * @param {array} map Mapa que se juega actualmente
         * @param {int} numMap Número del mapa que se juega actualmente
         * @returns Nuevo mapa que se va a jugar
         */
        changeMap(maps, map, numMap) {            
            clearInterval(this.interval);
            document.getElementById("map").remove();
            map = maps[numMap];
            this.map.drawMap(map);
            return map;
        }

        /**
         * Método que devuelve el número de gemas 
         * que quedan en el mapa
         * 
         * @param {array} maps Mapas del juego
         * @returns Número de gemas restante en el mapa
         */
        countGems(maps) {
            let numGems = 0;
            for(let i = 0; i < maps.length; i++) {
                for(let j = 0; j < maps[i].length; j++) {
                    for(let k = 0; k < maps[i][j].length; k++) {
                        if(maps[i][j][k] == "X") {
                            numGems++;
                        }   
                    }
                }
            }
            return numGems;
        }
    }
}