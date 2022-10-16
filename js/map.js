var nsMap = nsMap || {};
nsMap = {
    Map:class {

        /**
         * Método que genera el mapa de juego
         */
        generateMap() {
            const maps = [
                [
                    ["O", "X", "2", "2", "4", "X", "X", "X", "X", "X", "5", "2", "2", "X", "X"],
                    ["X", "X", "2", "4", "X", "X", "X", "A", "X", "X", "X", "5", "2", "X", "X"],
                    ["X", "X", "4", "X", "X", "X", "X", "6", "X", "X", "X", "X", "5", "X", "X"],
                    ["X", "X", "X", "X", "X", "X", "1", "2", "3", "X", "X", "X", "X", "X", "X"],
                    ["X", "X", "X", "X", "X", "1", "2", "2", "2", "3", "X", "X", "X", "X", "S"]
                ],
                [
                    ["X", "X", "X", "X", "X", "5", "2", "2", "2", "4", "X", "X", "X", "X", "X"],
                    ["X", "X", "X", "X", "X", "X", "5", "2", "4", "X", "X", "X", "X", "X", "X"],
                    ["X", "X", "3", "X", "X", "X", "X", "7", "X", "X", "X", "X", "1", "X", "X"],
                    ["X", "X", "2", "3", "X", "X", "X", "A", "X", "X", "X", "1", "2", "X", "X"],
                    ["X", "X", "2", "2", "3", "X", "X", "X", "X", "X", "1", "2", "2", "X", "O"]
                ]
            ];

            this.drawMap(maps[0]);
            return maps;
        }

        /**
         * Método que dibuja en pantalla el mapa de juego con los 
         * personajes colocados
         * 
         * @param {array} map Mapa de juego
         */
        drawMap(map) {
            let table = document.createElement("table");
            table.setAttribute("id", "map");
            table.setAttribute("id", "map");
            for(let i = 0; i < map.length; i++) {
                let tr = document.createElement("tr");
                for(let j = 0; j < map[i].length; j++) {
                    let th = document.createElement("th");
                    th.setAttribute("class", "cell-"+map[i][j]);
                    tr.appendChild(th);
                    tr.cells[j].appendChild(document.createTextNode(map[i][j]));
                    table.appendChild(tr);
                }
            }
            document.getElementById("gems").appendChild(table);
        }   
    }
}