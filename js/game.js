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
            const map = this.map.generateMap();

            this.buttonUp(map);
            this.buttonLeft(map);
            this.buttonRight(map);
            this.buttonDown(map);
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

            let button = document.createElement("button");
            button.appendChild(document.createTextNode("REINICIAR"));
            document.getElementById("btRestart").appendChild(button);
            button.onclick = function() {
                location.reload();
            }
        }

        foundCharacterPosition(map, character) {
            const positions = [];
            for (let i = 0; i < map.length; i++) {
                for (let j = 0; j < map[i].length; j++) {
                    if(map[i][j] == character) {
                        positions[0] = i;
                        positions[1] = j;
                    }
                }
            }
            return positions;
        }

        buttonUp(map) {
            document.getElementById("btUp").onclick = () => {
                const positions = this.foundCharacterPosition(map, "O");
                let positionX = positions[0];
                let positionY = positions[1];
                if (positionX > 0 && map[positionX-1][positionY] == "X") {
                    document.getElementById("map").remove();
                    map[positionX][positionY] = "X";
                    map[positionX-1][positionY] = "O";
                    this.enemyMovements(map);
                    this.map.drawMap(map);
                } else if(positionX > 0 && map[positionX-1][positionY] == "A") {
                    document.getElementById("map").remove();
                    map[positionX][positionY] = "X";
                    this.map.drawMap(map);
                    this.finishGame();
                }
            }
        }

        buttonLeft(map) {
            document.getElementById("btLeft").onclick = () => {
                const positions = this.foundCharacterPosition(map, "O");
                let positionX = positions[0];
                let positionY = positions[1];
                if (map[positionX][positionY-1] == "X") {
                    document.getElementById("map").remove();
                    map[positionX][positionY] = "X";
                    map[positionX][positionY-1] = "O";
                    this.enemyMovements(map);
                    this.map.drawMap(map);
                } else if(map[positionX][positionY-1] == "A") {
                    document.getElementById("map").remove();
                    map[positionX][positionY] = "X";
                    this.map.drawMap(map);
                    this.finishGame();
                }
            }
        }

        buttonRight(map) {
            document.getElementById("btRight").onclick = () => {
                const positions = this.foundCharacterPosition(map, "O");
                let positionX = positions[0];
                let positionY = positions[1];
                if (map[positionX][positionY+1] == "X") {
                    document.getElementById("map").remove();
                    map[positionX][positionY] = "X";
                    map[positionX][positionY+1] = "O";
                    this.enemyMovements(map);
                    this.map.drawMap(map);
                } else if(map[positionX][positionY+1] == "A") {
                    document.getElementById("map").remove();
                    map[positionX][positionY] = "X";
                    this.map.drawMap(map);
                    this.finishGame();
                }       
            }
        }

        buttonDown(map) {
            document.getElementById("btDown").onclick = () => {
                const positions = this.foundCharacterPosition(map, "O");
                let positionX = positions[0];
                let positionY = positions[1];
                if (positionX < map.length-1 && map[positionX+1][positionY] == "X") {
                    document.getElementById("map").remove();
                    map[positionX][positionY] = "X";
                    map[positionX+1][positionY] = "O";
                    this.enemyMovements(map);
                    this.map.drawMap(map);
                } else if(positionX < map.length-1 && map[positionX+1][positionY] == "A") {
                    document.getElementById("map").remove();
                    map[positionX][positionY] = "X";
                    this.map.drawMap(map);
                    this.finishGame();
                }
            }
        }

        enemyMovements(map) {
            const positions = this.foundCharacterPosition(map, "A");
            let positionX = positions[0];
            let positionY = positions[1];
            let isMoveValid = false;
            while(!isMoveValid) {
                let enemyMove = Math.floor(Math.random() * 4);
                switch(enemyMove) {
                    case 0:
                        if (positionX > 0 && map[positionX-1][positionY] != "1") {
                            map[positionX][positionY] = "X";
                            map[positionX-1][positionY] = "A";
                            isMoveValid = true;
                        } else if(positionX > 0 && map[positionX-1][positionY] == "O") {
                            map[positionX][positionY] = "X";
                            map[positionX-1][positionY] = "A";
                            this.finishGame();
                            isMoveValid = true;
                        }
                        break;
                    case 1:
                        if (positionY > 0 && map[positionX][positionY-1] != "1") {
                            map[positionX][positionY] = "X";
                            map[positionX][positionY-1] = "A";
                            isMoveValid = true;
                        } else if (positionY > 0 && map[positionX][positionY-1] == "O") {
                            map[positionX][positionY] = "X";
                            map[positionX][positionY-1] = "A";
                            this.finishGame();
                            isMoveValid = true;
                        }
                        break;
                    case 2:
                        if (positionY < map.length-1 && map[positionX][positionY+1] != "1") {
                            map[positionX][positionY] = "X";
                            map[positionX][positionY+1] = "A";
                            isMoveValid = true;
                        } else if (positionY < map.length-1 && map[positionX][positionY+1] == "O") {
                            map[positionX][positionY] = "X";
                            map[positionX][positionY+1] = "A";
                            this.finishGame();
                            isMoveValid = true;
                        }
                        break;
                    case 3:
                        if (positionX < map.length-1 && map[positionX+1][positionY] != "1") {
                            map[positionX][positionY] = "X";
                            map[positionX+1][positionY] = "A";
                            isMoveValid = true;
                        } else if (positionX < map.length-1 && map[positionX+1][positionY] == "O") {
                            map[positionX][positionY] = "X";
                            map[positionX+1][positionY] = "A";
                            this.finishGame();
                            isMoveValid = true;
                        }
                        break;
                }
            }
        }
    }
}