var nsBoard = nsBoard || {};
nsBoard = {
    Board:class {
        generateBoard() {
            let table = document.createElement("table");
            table.setAttribute("id", "board");
            const board = [
                ['X', 'X', '1', '1', '1', 'X', 'X', 'X', 'X', 'X', '1', '1', '1', 'X', 'X'],
                ['X', 'X', '1', '1', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '1', '1', 'X', 'X'],
                ['X', 'X', '1', 'X', 'X', 'X', 'X', '1', 'X', 'X', 'X', 'X', '1', 'X', 'X'],
                ['X', 'X', 'X', 'X', 'X', 'X', '1', '1', '1', 'X', 'X', 'X', 'X', 'X', 'X'],
                ['X', 'X', 'X', 'X', 'X', '1', '1', '1', '1', '1', '1', 'X', 'X', 'X', 'X']
            ];
            for (let i = 0; i < board.length; i++) {
                let tr = document.createElement("tr");
                for (let j = 0; j < board[i].length; j++) {
                    let th = document.createElement("th");
                    th.setAttribute("class", "cell");
                    tr.appendChild(th);
                    tr.cells[j].appendChild(document.createTextNode(board[i][j]));
                    table.appendChild(tr);
                }
            }
            board[0][0] = 'O';
            document.getElementById("title").appendChild(table);
        }
    }
}