const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const PORT = process.env.PORT || 3000;

const app = express();

const clientPath = `${__dirname}/client`;
console.log(`Serving static files from path ${clientPath}`);

app.use(express.static(clientPath));
const server = http.createServer(app);
const io = socketio(server);

server.listen(PORT);
console.log("Server listening at " + PORT);

//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
const getPlayerObject = playerId => {
    return Object.values(gridSystem).find(obj => obj.id === playerId); 
}
const getPlayerObjectKey = playerId => {
    const findThis = Object.values(gridSystem).find(obj => obj.id === playerId);
    return Object.keys(gridSystem).find(key => gridSystem[key] === findThis);
}

const gridMatrix = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1],
[1,0,0,0,1,0,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,1,1,1,1,1,0,1,1,0,0,0,1,0,0,1,0,1],
[1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,1],
[1,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,1,0,1],
[1,0,0,0,0,0,1,0,1,1,1,1,1,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,1,0,1,0,1,0,0,1,0,1],
[1,0,0,1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1],
[1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1],
[1,0,0,0,1,1,0,1,1,0,1,1,1,0,1,0,1,0,1,0,0,1,1,1,1,1,1,1,1,0,1,0,1,0,0,1,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1],
[1,0,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,0,1,1,0,0,1,0,0,0,0,1,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1],
[1,0,0,0,1,1,0,1,1,0,1,1,1,0,1,0,1,0,1,0,0,1,1,1,1,1,1,1,1,0,1,0,1,0,0,1,0,1],
[1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1],
[1,0,0,1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1],
[1,0,0,0,0,0,1,0,1,1,1,1,1,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,1,0,1,0,1,0,0,1,0,1],
[1,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,1,0,1],
[1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,1],
[1,0,0,0,1,0,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,1,1,1,1,1,0,1,1,0,0,0,1,0,0,1,0,1],
[1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

    ];

const gridMatrix2 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

];


class GridSystem {
    constructor(matrix, matrix2) {
        this.matrix = matrix;
        this.matrixMain = matrix;
        this.matrix2 = matrix2;
        this.cellSize = 40;
        this.padding = 2;
        this.startingSteps = 0;
        this.winY = 11;
        this.winX = 37;

        this.extraArr = ["TCR", "LOK", "KSY", "KN", "JT", "CJH", "LSH", "KX", "TJY"];

        this.p1 = { x: 2, y: 2, lable: 2, id: this.extraArr[0], steps: 1000, area: "area2" };

        this.p2 = { x: 3, y: 1, lable: 3, id: this.extraArr[1], steps: this.startingSteps, area: "mainArea" };
        this.p3 = { x: 1, y: 1, lable: 4, id: this.extraArr[2], steps: this.startingSteps, area: "mainArea" };
        this.p4 = { x: 3, y: 3, lable: 5, id: this.extraArr[3], steps: this.startingSteps, area: "mainArea" };
        this.p5 = { x: 3, y: 2, lable: 6, id: this.extraArr[4], steps: this.startingSteps, area: "mainArea" };

        this.p6 = { x: 3, y: 19, lable: 7, id: this.extraArr[5], steps: this.startingSteps, area: "mainArea" };
        this.p7 = { x: 3, y: 18, lable: 8, id: this.extraArr[6], steps: this.startingSteps, area: "mainArea" };
        this.p8 = { x: 1, y: 19, lable: 9, id: this.extraArr[7], steps: this.startingSteps, area: "mainArea" };
        this.p9 = { x: 2, y: 12, lable: 10, id: this.extraArr[8], steps: this.startingSteps, area: "mainArea" };
        
        this.playersArr = [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6, this.p7, this.p8, this.p9];

        this.playersArr.forEach((player) => {
            this.#startingPoint(player);
        });

        this.moveSwitch = 0;
        
    }

    #startingPoint(plyrSlot) {
        if(plyrSlot.area === "area2") {
            this.matrix = this.matrix2;
        } else {
            this.matrix = this.matrixMain;
        }

        this.matrix[plyrSlot.y][plyrSlot.x] = plyrSlot.lable;
        
    }

    #isValidMove(plyrSlot, x, y) {
        if(plyrSlot.area === "area2") {
            this.matrix = this.matrix2;
        } else {
            this.matrix = this.matrixMain;
        }

        if (this.matrix[plyrSlot.y + y][plyrSlot.x + x] === 0) {
            return true;
        }
        return false;
    }

    movePlayer(keyCode, plyrSlot) {

        if (keyCode === 37) {
            if (this.#isValidMove(plyrSlot, -1, 0)) {
                this.#updPosition(37, plyrSlot);
                plyrSlot.steps--;
            }

        } else if (keyCode === 39) {
            if (this.#isValidMove(plyrSlot, 1, 0)) {
                this.#updPosition(39, plyrSlot);
                plyrSlot.steps--;
            }

        } else if (keyCode === 38) {
            if (this.#isValidMove(plyrSlot, 0, -1)) {
                this.#updPosition(38, plyrSlot);
                plyrSlot.steps--;
            }

        } else if (keyCode === 40) {
            if (this.#isValidMove(plyrSlot, 0, 1)) {
                this.#updPosition(40, plyrSlot);
                plyrSlot.steps--;
            }

        }
    }

    #updPosition(keyCode, plyrSlot) {
        if(plyrSlot.area === "area2") {
            this.matrix = this.matrix2;
        } else {
            this.matrix = this.matrixMain;
        }

        if (keyCode === 37) {
            this.matrix[plyrSlot.y][plyrSlot.x] = 0;
            this.matrix[plyrSlot.y][plyrSlot.x - 1] = plyrSlot.lable;
            plyrSlot.x--;
        } else if (keyCode === 39) {
            this.matrix[plyrSlot.y][plyrSlot.x] = 0;
            this.matrix[plyrSlot.y][plyrSlot.x + 1] = plyrSlot.lable;
            plyrSlot.x++;
        } else if (keyCode === 38) {
            this.matrix[plyrSlot.y][plyrSlot.x] = 0;
            this.matrix[plyrSlot.y - 1][plyrSlot.x] = plyrSlot.lable;
            plyrSlot.y--;
        } else if (keyCode === 40) {
            this.matrix[plyrSlot.y][plyrSlot.x] = 0;
            this.matrix[plyrSlot.y + 1][plyrSlot.x] = plyrSlot.lable;
            plyrSlot.y++;
        }

    }

    emitToUsers(nickname) {

        const gridSysKey = getPlayerObjectKey(nickname);

        if (this[gridSysKey].area === "area2") {
            var gridMatrix = gridMatrix2;
            sock.emit('sendMatrix', { gridMatrix, playersArr });
        } else {
            var gridMatrix = gridSystem.matrixMain
            sock.emit('sendMatrix', { gridMatrix, playersArr });
        }
        
    }

    test() {
        const gridSysKey = getPlayerObjectKey("TCR");
        console.log(this[gridSysKey].area);
    }

    teleportMeOut() {
        this.matrix[this.p1.y][this.p1.x] = 0;
        this.matrix[7][4] = this.p1.lable;
        this.p1.y = 7;
        this.p1.x = 4;
    }
    teleportMeIn() {
        this.matrix[this.p1.y][this.p1.x] = 0;
        this.matrix[7][1] = this.p1.lable;
        this.p1.y = 7;
        this.p1.x = 1;
    }

    winner(plyrSlot) {
        
        this.matrix[plyrSlot.y][plyrSlot.x] = 0;
        this.matrix[this.winY][this.winX] = plyrSlot.lable;
        plyrSlot.y = this.winY;
        this.winY++;
        
        plyrSlot.x = 38;
        
    }

}

const gridSystem = new GridSystem(gridMatrix, gridMatrix2);




//const theKey = getPlayerObject("TCR")




var mindControlMode = false;
var mindControlledStudent = "";


io.sockets.on('connection', function (sock) {

    sock.on('newuser', (data) => {

        sock.id = data; //"TCR"
        var playersArr = gridSystem.playersArr;

        const gridSysKey = getPlayerObjectKey(sock.id);
        if (gridSystem[gridSysKey].area === "area2") {
            var gridMatrix = gridMatrix2;
            var area = "0";
            sock.emit('sendMatrix', { gridMatrix, playersArr, area });
        } else {
            var gridMatrix = gridSystem.matrixMain;
            var area = "0";
            sock.emit('sendMatrix', { gridMatrix, playersArr, area });
        }

        // gridSystem.playersArr.forEach((player) => {

        //     if (player.id === sock.id) {
        //         if (player.area === "area2") {
        //             var gridMatrix = gridMatrix2;
        //             io.emit('sendMatrix', { gridMatrix, playersArr });
        //         } else {
        //             var gridMatrix = gridSystem.matrixMain
        //             io.emit('sendMatrix', { gridMatrix, playersArr });
        //         }
                
        //     }
            
        // });

        sock.on('keyPress', function (data) {

            if (mindControlMode === false) {

                if (gridSystem[gridSysKey].steps <= 0) {return}
                gridSystem.movePlayer(data, gridSystem[gridSysKey]);
                var area = gridSystem[gridSysKey].area;
                io.emit('sendMatrix', { gridMatrix, playersArr, area });

            } else if (mindControlMode === true && sock.id === "TCR") {

                const newGridSysKey = getPlayerObjectKey(mindControlledStudent);
                if (gridSystem[newGridSysKey].steps <= 0) {return}
                gridSystem.movePlayer(data, gridSystem[newGridSysKey]);
                var area = gridSystem[newGridSysKey].area;
                io.emit('sendMatrix', { gridMatrix, playersArr, area });

            }
            

        });

    });

    /* sock.on('disconnect', function() {
        delete SOCKET_LIST[sock.id];
        Player.onDisconnect(sock);
    }); */

    sock.on('teleportMeOut', () => {
        gridSystem.teleportMeOut();
    });
    
    sock.on('winner', (data) => {
        gridSystem.playersArr.forEach((player, index) => {
            if (player.id === data) {
                gridSystem.winner(gridSystem.playersArr[index]);
            }
        });
        
        var playersArr = gridSystem.playersArr;
        io.emit('sendMatrix', { gridMatrix, playersArr });
    });

    sock.on('teleportMeIn', () => {
        gridSystem.teleportMeIn();
    });

    sock.on('addSteps', (data) => {
        var playersArr = gridSystem.playersArr;
        gridSystem.playersArr.forEach((player) => {
            if (player.id === data.studentId) {
                var convertToNum = Number(data.getNum)
                if (player.steps + convertToNum > 30) {
                    var message = player.id + " steps capacity exceeded! Failed."
                    io.emit('chat-to-clients', message);
                } else {
                    var message2 = player.id + " added " + convertToNum + " steps succesful!"
                    player.steps += convertToNum;
                    io.emit('chat-to-clients', message2);
                }
                io.emit('sendMatrix', { gridMatrix, playersArr });
            }
        });
    });

    sock.on('mindControl', (data) => {
        mindControlledStudent = data;
        mindControlMode = true;
    });
    sock.on('mindControlOff', () => {
        mindControlledStudent = "";
        mindControlMode = false;
    });

    sock.on('chat-to-server', (data) => {
        io.emit('chat-to-clients', data);
    });

});


/* setInterval(function () {
    var playersArr = gridSystem.playersArr;
    io.emit('sendMatrix', { gridMatrix, playersArr });

}, 2000); */