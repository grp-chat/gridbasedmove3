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
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,20,20,20,20,1],
    [1,0,0,0,1,0,0,1,0,0,1,1,1,0,1,1,1,1,1,0,0,1,1,1,0,1,0,1,0,0,0,0,20,20,20,1],
    [1,0,0,0,1,0,1,20,1,0,0,20,0,1,0,0,0,0,0,0,1,20,0,0,1,0,0,0,1,0,1,0,0,0,0,1],
    [1,0,1,1,20,0,1,0,1,0,20,1,20,1,0,0,0,1,1,1,0,0,0,0,1,0,0,20,1,0,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,20,1,0,1,20,20,20,0,1],
    [1,0,1,1,0,1,0,0,0,0,0,1,20,20,1,1,0,0,1,1,1,20,0,0,1,0,0,20,1,0,1,20,20,20,0,1],
    [1,0,0,20,1,0,0,0,0,1,0,0,0,1,20,20,20,1,20,20,20,1,20,0,0,0,0,20,1,0,20,1,20,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,1,20,20,1,20,1,1,20,20,20,20,20,1,1,1,1,1,1,20,0,0,20,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,1,0,0,1,20,20,20,1,20,20,20,20,20,20,20,20,20,20,20,1,0,0,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,20,1,20,1,20,20,20,0,1,20,20,1,20,1,20,1,20,1,20,20,1,0,0,0,0,1],
    [1,0,0,0,0,0,20,0,20,0,1,0,0,1,20,20,20,1,20,20,20,20,20,20,20,20,20,20,20,1,0,0,1,0,0,1],
    [1,0,0,0,1,0,0,20,0,20,1,20,20,1,20,1,1,20,20,20,20,20,1,1,1,1,1,1,20,0,0,20,1,0,0,1],
    [1,0,0,0,1,0,0,0,20,1,20,0,0,1,20,20,20,1,20,20,20,1,20,20,20,20,20,20,1,0,20,1,20,1,0,1],
    [1,0,1,1,0,1,0,0,0,0,20,1,20,20,1,1,20,20,1,1,1,20,20,20,1,20,20,20,1,0,1,20,20,0,0,1],
    [1,0,0,0,0,0,1,0,1,20,0,1,0,1,20,20,1,20,20,20,20,1,20,20,1,20,0,20,1,0,1,20,20,0,0,1],
    [1,0,1,1,0,0,1,0,1,0,20,1,20,1,20,0,0,1,1,1,20,20,20,20,1,20,0,20,1,0,0,1,1,1,0,1],
    [1,0,0,0,1,0,1,0,1,0,0,20,0,1,20,0,0,0,0,0,1,20,20,0,1,0,0,0,1,0,1,0,0,0,0,1],
    [1,0,0,0,1,0,0,1,0,0,1,1,1,0,1,1,1,1,1,0,0,1,1,1,20,1,0,1,20,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
                
    ];

const gridMatrix2 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
    [1,20,0,0,0,0,0,0,20,20,20,20,1,0,1,20,20,20,20,0,0,0,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,1,1,1,1,1,1,1,1,20,1,20,20,20,20,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,20,20,20,20,1,20,20,20,20,0,0,0,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,1,1,1,1,1,1,1,20,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,20,20,1,20,20,20,20,20,20,20,0,0,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,1,1,1,1,1,1,20,1,1,1,1,1,1,1,1,1,1,20,0,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,20,20,1,20,20,20,1,0,0,0,1,0,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,20,20,1,20,1,0,1,0,1,0,1,0,20,0,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,20,20,1,20,1,0,1,0,1,0,1,0,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,0,20,1,20,1,0,1,0,1,0,1,0,0,20,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,1,1,1,1,1,1,20,1,20,1,0,1,0,1,0,1,0,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,20,20,1,20,1,0,1,0,1,0,1,1,1,20,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,1,1,1,1,1,1,1,20,1,0,1,0,1,0,1,0,1,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,20,20,20,20,1,0,0,0,1,0,0,0,0,20,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,20,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,20,0,20,0,20,0,20,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,20,0,20,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
                        
];

const gridMatrix3 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [1,20,0,0,0,20,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,1,0,1,0,0,0,0,0,0],
    [1,0,0,20,0,0,0,20,0,0,0,20,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,20,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
    [1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,20,0,0,1,0,1,0,0,0,0,0,0],
    [1,20,0,0,1,20,20,20,0,20,0,1,0,1,1,0,1,20,0,20,0,20,20,1,0,0,20,1,0,1,0,0,0,0,0,0],
    [1,0,20,0,1,20,20,0,20,0,20,1,0,1,1,0,1,0,20,0,20,20,20,1,0,20,0,1,0,1,0,0,0,0,0,0],
    [1,0,0,20,1,20,20,20,0,20,0,1,0,1,1,0,1,20,0,20,0,20,20,1,20,0,0,1,0,1,0,0,0,0,0,0],
    [1,0,20,0,1,20,20,0,20,0,20,0,0,0,0,0,0,0,0,0,0,0,20,1,0,20,0,1,0,1,0,0,0,0,0,0],
    [1,20,0,0,1,20,20,20,0,20,0,0,0,0,0,0,0,20,0,20,0,20,20,1,0,0,20,1,0,1,0,0,0,0,0,0],
    [1,0,20,0,1,20,20,0,20,0,20,1,0,1,1,0,1,0,20,0,20,20,20,1,0,20,0,1,0,1,0,0,0,0,0,0],
    [1,0,0,20,1,20,20,20,0,20,0,1,0,1,1,0,1,20,0,20,0,20,20,1,20,0,0,1,0,1,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,0,20,0,20,1,0,1,1,0,1,0,20,0,20,20,20,1,0,0,20,1,0,1,0,0,0,0,0,0],
    [1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,20,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
    [1,0,0,20,0,0,0,20,0,0,0,20,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
    [1,20,0,0,0,20,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,1,0,1,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0]
                    
];


//##############################################################################################################

class GridSystem {
    constructor(matrix, matrix2, matrix3) {
        this.matrix = matrix;
        this.matrixMain = matrix;
        this.matrix2 = matrix2;
        this.matrix3 = matrix3;
        this.cellSize = 40;
        this.padding = 2;
        this.startingSteps = 0;
        this.winY = 11;
        this.winX = 37;
        this.walletMax = 1000;
        this.allAreas = {
            "mainArea": this.matrixMain,
            "area2": this.matrix2,
            "mainArea2": this.matrixMain,
            "area3": this.matrix3
        }
        this.entrances = {
            "mainArea": { x: 29, y: 2},
            "area2": { x: 2, y: 3},
            "mainArea2": {x: 29, y: 18},
            "area3": {x: 25, y: 15}
        }

        this.extraArr = ["TCR", "LOK", "KSY", "KN", "JT", "CJH", "LSH", "KX", "TJY", "CED"];

        this.p1 = { x: 1, y: 1, lable: 2, id: this.extraArr[0], steps: 1000, area: "area3", wallet: 0, total: 0 };

        this.p2 = { x: 17, y: 8, lable: 3, id: this.extraArr[1], steps: this.startingSteps, area: "area2", wallet: 0, total: 3200 };
        this.p3 = { x: 22, y: 3, lable: 4, id: this.extraArr[2], steps: this.startingSteps, area: "mainArea", wallet: 0, total: 5700 };
        this.p4 = { x: 2, y: 9, lable: 5, id: this.extraArr[3], steps: this.startingSteps, area: "mainArea", wallet: 0, total: 0 };
        this.p5 = { x: 2, y: 2, lable: 6, id: this.extraArr[4], steps: this.startingSteps, area: "area2", wallet: 0, total: 3500 };

        this.p6 = { x: 11, y: 16, lable: 7, id: this.extraArr[5], steps: this.startingSteps, area: "area2", wallet: 600, total: 3200 };
        this.p7 = { x: 3, y: 18, lable: 8, id: this.extraArr[6], steps: this.startingSteps, area: "mainArea", wallet: 0, total: 0 };
        this.p8 = { x: 2, y: 11, lable: 9, id: this.extraArr[7], steps: this.startingSteps, area: "mainArea", wallet: 0, total: 0 };
        this.p9 = { x: 3, y: 19, lable: 10, id: this.extraArr[8], steps: this.startingSteps, area: "mainArea", wallet: 0, total: 0 };
        this.p10 = { x: 21, y: 8, lable: 11, id: this.extraArr[9], steps: this.startingSteps, area: "area3", wallet: 300, total: 2000 };

        
        this.playersArr = [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6, this.p7, this.p8, this.p9, this.p10];

        this.playersArr.forEach((player) => {
            this.#startingPoint(player);
        });

        this.moveSwitch = 0;
        
    }

    #startingPoint(plyrSlot) {

        this.matrix = this.allAreas[plyrSlot.area];

        this.matrix[plyrSlot.y][plyrSlot.x] = plyrSlot.lable;
        
    }

    #isValidMove(plyrSlot, x, y) {

        this.matrix = this.allAreas[plyrSlot.area];

        if (this.matrix[plyrSlot.y + y][plyrSlot.x + x] === 0) {
            return true;
        }
        if (this.matrix[plyrSlot.y + y][plyrSlot.x + x] === 20 && plyrSlot.wallet < this.walletMax) {
            plyrSlot.wallet += 100;
            return true;
        }
        
        return false;
    }

    
    #updPosition(keyCode, plyrSlot) {
        this.matrix = this.allAreas[plyrSlot.area];

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
        this.playersArr.forEach((player) => {

            //this.allAreas[player.area][this.entrances[player.area].y][this.entrances[player.area].x] = player.lable

            if (player.y === this.entrances["area2"].y && 
                player.x === this.entrances["area2"].x && 
                player.area === "area2") {

                    this.matrix2[this.entrances[player.area].y][this.entrances[player.area].x] = player.lable;
            }
            
            if (player.y === this.entrances["mainArea"].y && 
                player.x === this.entrances["mainArea"].x && 
                (player.area === "mainArea" || player.area === "mainArea2")) {

                    //console.log("here is the error")
                    //this.matrixMain[2][17] = player.lable
                    this.matrixMain[this.entrances["mainArea"].y][this.entrances["mainArea"].x] = player.lable;
            }

            if (player.y === this.entrances["mainArea2"].y &&
                 player.x === this.entrances["mainArea2"].x && 
                 (player.area === "mainArea" || player.area === "mainArea2")) {

                    
                    this.matrixMain[this.entrances["mainArea2"].y][this.entrances["mainArea2"].x] = player.lable;
            }
            if (player.y === this.entrances["area3"].y && 
                player.x === this.entrances["area3"].x && 
                player.area === "area3") {

                    //this.matrix3[3][3] = player.lable
                    this.matrix3[this.entrances["area3"].y][this.entrances["area3"].x] = player.lable;

            }
        });
    }


    transitionToAnotherArea(area, plyrSlot) {
        this.matrix[plyrSlot.y][plyrSlot.x] = 0;

        this.matrix = this.allAreas[plyrSlot.area];
        plyrSlot.y = this.entrances[plyrSlot.area].y;
        plyrSlot.x = this.entrances[plyrSlot.area].x;

        this.matrix[plyrSlot.y][plyrSlot.x] = plyrSlot.lable;

    }
    transitionToAnotherArea2(area, plyrSlot) {
        this.matrix[plyrSlot.y][plyrSlot.x] = 0;

        this.matrix = this.allAreas[area];
        if (area === "area3") {
            plyrSlot.y = 1;
            plyrSlot.x = 28;
        } else if (area === "area2") {
            plyrSlot.y = 1;
            plyrSlot.x = 26;
        } else if (area === "mainArea") {
            plyrSlot.y = 1;
            plyrSlot.x = 1;
        }
        
        this.matrix[plyrSlot.y][plyrSlot.x] = plyrSlot.lable;

    }

    emitToUsers() {
        var sendGridMatrix1 = this.matrixMain;
        var sendGridMatrix2 = this.matrix2;
        var sendGridMatrix3 = this.matrix3;
        var playersArr = this.playersArr;
                
        io.emit('sendMatrix', { sendGridMatrix1, sendGridMatrix2, sendGridMatrix3, playersArr });
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

//##############################################################################################################


const gridSystem = new GridSystem(gridMatrix, gridMatrix2, gridMatrix3);

cdm = {
    area1: [{x:2,y:10},{x:17,y:10},{x:20,y:2},{x:20,y:18},{x:23,y:3},{x:23,y:17},{x:30,y:4},{x:30,y:16},{x:34,y:10}],
    area2: [{x:1,y:8},{x:10,y:10},{x:13,y:1},{x:21,y:13}],
    area3: {x:16,y:2}
}


// var nickname = "TCR"
// const obj = {
//     "area2": {
//         "area2": {
//             [nickname]: {
//                 init: function () {this.run();},
//                 run: function () {console.log("Yes OK")}
//             }
// }
//     },
    
    
// }

// var peri1 = "area2"
// var peri2 = "area2"
// obj[peri1][peri2][nickname].run();




//const theKey = getPlayerObject("TCR")


var mindControlMode = false;
var mindControlledStudent = "";



io.sockets.on('connection', function (sock) {

    sock.on('newuser', (data) => {

        sock.id = data; //"TCR"
        const playersArr = gridSystem.playersArr;

        const gridSysKey = getPlayerObjectKey(sock.id);

        var sendGridMatrix1 = gridSystem.matrixMain;
        var sendGridMatrix2 = gridSystem.matrix2;
        var sendGridMatrix3 = gridSystem.matrix3;
        sock.emit('loadMatrix', { sendGridMatrix1, sendGridMatrix2, sendGridMatrix3, playersArr });
       
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

//DOOR========DOOR========DOOR========DOOR========DOOR========DOOR========DOOR========DOOR========DOOR========

                if (gridSystem[gridSysKey].x === 1 && gridSystem[gridSysKey].y === 3 
                    && gridSystem[gridSysKey].area === "area2") {

                        gridSystem[gridSysKey].area = "mainArea";
                        gridSystem.transitionToAnotherArea("mainArea", gridSystem[gridSysKey]);

                        gridSystem.emitToUsers();
                }
                if (gridSystem[gridSysKey].x === 29 && gridSystem[gridSysKey].y === 1 
                    && (gridSystem[gridSysKey].area === "mainArea" ||
                    gridSystem[gridSysKey].area === "mainArea2")) {

                        gridSystem[gridSysKey].area = "area2";
                        gridSystem.transitionToAnotherArea("area2", gridSystem[gridSysKey]);

                        gridSystem.emitToUsers();
                }
                if (gridSystem[gridSysKey].x === 29 && gridSystem[gridSysKey].y === 19 
                    && (gridSystem[gridSysKey].area === "mainArea" ||
                    gridSystem[gridSysKey].area === "mainArea2")) {

                        gridSystem[gridSysKey].area = "area3";
                        gridSystem.transitionToAnotherArea("area3", gridSystem[gridSysKey]);

                        gridSystem.emitToUsers();
                }
                if (gridSystem[gridSysKey].x === 24 && gridSystem[gridSysKey].y === 15 
                    && gridSystem[gridSysKey].area === "area3") {

                        gridSystem[gridSysKey].area = "mainArea2";
                        gridSystem.transitionToAnotherArea("mainArea2", gridSystem[gridSysKey]);

                        gridSystem.emitToUsers();
                }
//DOOR========DOOR========DOOR========DOOR========DOOR========DOOR========DOOR========DOOR========DOOR========

//CDM=========CDM=========CDM=========CDM=========CDM=========CDM=========CDM=========CDM=========CDM=========
                cdm.area1.forEach((coordinate) => {
                    if (gridSystem[gridSysKey].x === coordinate.x && gridSystem[gridSysKey].y === coordinate.y 
                        && (gridSystem[gridSysKey].area === "mainArea"||gridSystem[gridSysKey].area === "mainArea2")) {
                        
                            gridSystem[gridSysKey].total += gridSystem[gridSysKey].wallet;
                            gridSystem[gridSysKey].wallet = 0;

                            gridSystem.emitToUsers();
                    }
                });
                cdm.area2.forEach((coordinate) => {
                    if (gridSystem[gridSysKey].x === coordinate.x && gridSystem[gridSysKey].y === coordinate.y 
                        && gridSystem[gridSysKey].area === "area2") {
                        
                            gridSystem[gridSysKey].total += gridSystem[gridSysKey].wallet;
                            gridSystem[gridSysKey].wallet = 0;
                        
                            gridSystem.emitToUsers();
                    }
                });

                if (gridSystem[gridSysKey].x === cdm.area3.x && gridSystem[gridSysKey].y === cdm.area3.y 
                    && gridSystem[gridSysKey].area === "area3") {
                    
                        gridSystem[gridSysKey].total += gridSystem[gridSysKey].wallet;
                        gridSystem[gridSysKey].wallet = 0;
                    
                        gridSystem.emitToUsers();
                }
//CDM=========CDM=========CDM=========CDM=========CDM=========CDM=========CDM=========CDM=========CDM=========

                gridSystem.emitToUsers();


            } else if (mindControlMode === true && sock.id === "TCR") {

                const newGridSysKey = getPlayerObjectKey(mindControlledStudent);
                if (gridSystem[newGridSysKey].steps <= 0) {return}
                gridSystem.movePlayer(data, gridSystem[newGridSysKey]);

                gridSystem.emitToUsers();

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
        
        gridSystem.playersArr.forEach((player) => {
            if (player.id === data.studentId) {
                var convertToNum = Number(data.getNum)
                if (player.steps + convertToNum > 45) {
                    var message = player.id + " steps capacity exceeded! Failed."
                    io.emit('chat-to-clients', message);
                } else {
                    var message2 = player.id + " added " + convertToNum + " steps succesful!"
                    player.steps += convertToNum;
                    io.emit('chat-to-clients', message2);
                }

                gridSystem.emitToUsers();
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

    sock.on('teleportPlayerArea2', (data) => {

        const gridSysKey = getPlayerObjectKey(data);
        gridSystem[gridSysKey].area = "area2";
        gridSystem.transitionToAnotherArea2("area2", gridSystem[gridSysKey]);

        gridSystem.emitToUsers();
        
    });
    sock.on('teleportPlayerArea3', (data) => {

        const gridSysKey = getPlayerObjectKey(data);
        gridSystem[gridSysKey].area = "area3";
        gridSystem.transitionToAnotherArea2("area3", gridSystem[gridSysKey]);

        gridSystem.emitToUsers();
        
    });

    sock.on('teleportPlayerMainArea', (data) => {

        const gridSysKey = getPlayerObjectKey(data);
        gridSystem[gridSysKey].area = "mainArea";
        gridSystem.transitionToAnotherArea2("mainArea", gridSystem[gridSysKey]);

        gridSystem.emitToUsers();
        
    });

    sock.on('chat-to-server', (data) => {
        io.emit('chat-to-clients', data);
    });

});


/* setInterval(function () {
    var playersArr = gridSystem.playersArr;
    io.emit('sendMatrix', { gridMatrix, playersArr });

}, 2000); */