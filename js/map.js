var nsMap = nsMap || {};
nsMap = {
    Map:class {

        /**
         * Método que genera el mapa de juego
         */
        generateMap() {
            const map = [
                ["X", "X", "1", "1", "1", "X", "X", "X", "X", "X", "1", "1", "1", "X", "X"],
                ["X", "X", "1", "1", "X", "X", "X", "X", "X", "X", "X", "1", "1", "X", "X"],
                ["X", "X", "1", "X", "X", "X", "X", "1", "X", "X", "X", "X", "1", "X", "X"],
                ["X", "X", "X", "X", "X", "X", "1", "1", "1", "X", "X", "X", "X", "X", "X"],
                ["X", "X", "X", "X", "X", "1", "1", "1", "1", "1", "1", "X", "X", "X", "X"]
            ];

            this.placeCharacters(map);
            this.drawmap(map);
        }

        /**
         * Método que coloca los personajes en el mapa en posiciones aleatorias
         * 
         * @param {array} map Mapa de juego
         */
        placeCharacters(map) {
            for (let i = 0; i < 2; i++) {
                let positionX, positionY, character;
                do {
                    positionX = Math.floor(Math.random() * map.length);
                    positionY = Math.floor(Math.random() * map[0].length);    
                    character = map[positionX][positionY];
                } while (character != "X");
                if (i == 0) {
                    map[positionX][positionY] = "O";
                } else {
                    map[positionX][positionY] = "A";
                }
            }
        }

        /**
         * Método que dibuja en pantalla el mapa de juego con los 
         * personajes colocados
         * 
         * @param {array} map Mapa de juego
         */
        drawmap(map) {
            let table = document.createElement("table");
            table.setAttribute("id", "map");
            table.setAttribute("id", "map");
            for (let i = 0; i < map.length; i++) {
                let tr = document.createElement("tr");
                for (let j = 0; j < map[i].length; j++) {
                    let th = document.createElement("th");
                    th.setAttribute("class", "cell-"+map[i][j]);
                    tr.appendChild(th);
                    tr.cells[j].appendChild(document.createTextNode(map[i][j]));
                    table.appendChild(tr);
                }
            }
            document.getElementById("title").appendChild(table);
        }
    }
}