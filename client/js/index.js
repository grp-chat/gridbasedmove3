const sock = io();

var nickname;
var player1 = new Image();

//player1.src = "https://lh3.googleusercontent.com/10PkSlNxU3SMcIQPGEH0Ius_wV1hiRoTtfEQFvaW_YpzdA7aZrd3LxirFvvLc93ulP_-LgVCSV4yjXpNRVNibx9iQtnebU-Vrg62xhHSQhPDAn_nhE6uBYNyoJ1unD9lVp-3ncMlEw=w2400"

//studentsArr = ["TCR", "LXR", "LK", "JHA", "JV", "JL", "SZF", "H"];
studentsArr = ["TCR", "LOK", "KSY", "KN", "JT", "CJH", "LSH", "KX", "TJY", "CED"];
elementsArr = [];

studentsArr.forEach((student) => {
    const element = document.getElementById(student+"Steps");
    element.innerHTML = student
    elementsArr.push(element);
});
//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL

const promptMsg = () => {

    //const sat2PMStudents = [LK, LXR, SZF, JHA, JL, JV, H, TCR];
    const sun230pmStudents = ["LOK", "KSY", "KN", "JT", "CJH", "LSH", "KX", "TJY"];
    const sat4pmStudents = ["JX", "JZ", "TWN", "LJY", "LSH", "ELI", "CUR", "CT", "RYD"];

    const studentLogins = {
        teacher: {pinNumber:'8', nickname: 'TCR'},
        len: {pinNumber:'1502', nickname: 'LEN'},

        sat2pmStudent1: {pinNumber:'9852', nickname: 'LK'},
        sat2pmStudent2: {pinNumber:'9035', nickname: 'LXR'},
        sat2pmStudent3: {pinNumber:'3839', nickname: 'SZF'},
        sat2pmStudent4: {pinNumber:'3583', nickname: 'JHA'},
        sat2pmStudent5: {pinNumber:'1072', nickname: 'JL'},
        sat2pmStudent6: {pinNumber:'5691', nickname: 'JV'},
        sat2pmStudent7: {pinNumber:'4048', nickname: 'H'},
        
        sat4pmStudent1: {pinNumber:'1289', nickname: "JX"},
        sat4pmStudent2: {pinNumber:'3825', nickname: "JZ"},
        sat4pmStudent3: {pinNumber:'8579', nickname: "TWN"},
        sat4pmStudent4: {pinNumber:'8828', nickname: "LJY"},
        sat4pmStudent5: {pinNumber:'1529', nickname: "LSH"},
        sat4pmStudent6: {pinNumber:'3191', nickname: "ELI"},
        sat4pmStudent7: {pinNumber:'3307', nickname: "CUR"},
        sat4pmStudent8: {pinNumber:'2318', nickname: "CT"},
        sat4pmStudent9: {pinNumber:'7385', nickname: "RYD"},

        sun230pmStudent1: {pinNumber:'1198', nickname: "LOK"},
        sun230pmStudent2: {pinNumber:'6139', nickname: "KSY"},
        sun230pmStudent3: {pinNumber:'7051', nickname: "KN"},
        sun230pmStudent4: {pinNumber:'4162', nickname: "JT"},
        sun230pmStudent5: {pinNumber:'2105', nickname: "CJH"},
        sun230pmStudent6: {pinNumber:'5086', nickname: "CED"},
        sun230pmStudent7: {pinNumber:'2167', nickname: "KX"},
        sun230pmStudent8: {pinNumber:'6588', nickname: "TJY"}
    }

    const getNickname = pinNumber => {
        return Object.values(studentLogins).find(obj => obj.pinNumber === pinNumber)?.nickname;
    }

    var nick = prompt("Please enter your pin number:");
    while (nick.length == 0) {
        alert("Please enter your pin number!");
        nick = prompt("Please enter your pin number:");
    }

    nickname = getNickname(nick);
    
    /* sat2PM.forEach((login) => {
        if (nick === login.pinNumber) {
            nickname = login.nickname 
        } 
    });
    sun230PM.forEach((login) => {
        if (nick === login.pinNumber) {
            nickname = login.nickname 
        } 
    }); */
    
    if (typeof(nickname) === 'undefined') {
        alert("Wrong pin number!");
        promptMsg();
    }
};

promptMsg();
sock.emit('newuser', nickname);

//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL


function createChatDivs() {
    const chatSec = document.getElementById("chat");
    var chatDiv = document.createElement("div");
    //var chatDiv = document.getElementById("chatdiv");
    //chatDiv.setAttribute("id", "chatdiv");
    chatDiv.style.width = "272px";
    chatDiv.style.height = "320px";
    //chatDiv.style = "background:rgba(255, 255, 255, 0.5); color:black; overflow: auto;"
    chatDiv.style.background = "rgba(255, 255, 255, 0.5)";
    chatDiv.style.color = "black";
    chatDiv.style.overflow = "auto";
    chatDiv.style.overflowX = "hidden";
    //chatDiv.style.float = "right";
    //chatDiv.style.marginLeft = "2%";
    //chatDiv.style.position = "fixed";
    chatDiv.style.top = "30px";
    //chatDiv.style.right = "30px";


    chatSec.appendChild(chatDiv);

    var chatInput = document.createElement('input');
    //chatInput.className = "form-control";
    chatInput.style.width = "205px";
    chatInput.style.height = "45px";
    chatInput.setAttribute("id", "chatinput");
    chatInput.setAttribute("type", "text");
    chatInput.style.display = "inline";
    chatInput.style.fontSize = "1.2em";
    chatDiv.appendChild(chatInput);

    var chatBtn = document.createElement('button');

    chatBtn.className = "btn";
    chatBtn.setAttribute("id", "chatBtn");
    chatBtn.innerHTML = "Send";
    chatBtn.style.height = "50px";
    chatBtn.style.width = "55px";


    chatDiv.appendChild(chatBtn);

    var div3 = document.createElement('div');
    div3.setAttribute("id", "div3");
    div3.style.width = '350px';
    div3.style.height = '260px'
    div3.style.color = 'black';
    div3.style.background = 'rgba(236, 236, 236, 0.5)';
    div3.style.overflowY = "auto";
    chatDiv.appendChild(div3);

    chatBtn.addEventListener('click', function () {
        var message = nickname + ': ';
        message += chatInput.value;
        sock.emit('chat-to-server', message);
        chatInput.value = '';
    });

    chatInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("chatBtn").click();
        }

    });

    return chatSec;
}

//============COMMAND BUILDER======================COMMAND BUILDER===================COMMAND BUILDER==========

class fixedCommand {
    constructor (prefix, sockEmitFlag) {
        this.prefix = prefix; 
        this.sockEmitFlag = sockEmitFlag;
    }

    executeCommand(message) {
        //var extractNickname = message.slice(4).replace(/[^A-Z]+/g, "");
        if (nickname != "TCR") {return}
        if (message.slice(0, this.prefix.length) != this.prefix) {return}
        //if (studentsArr.includes(extractNickname) === false) {return}
        
        sock.emit(this.sockEmitFlag);

        if(this.sockEmitFlag === 'mindControlOff') {
            sock.emit('chat-to-server', "Mind control mode deactivated");
        }

        //let text = "[" + connectedArr.toString() + "]";
        //sock.emit('chat-to-server', numberOfPlayers);

        if (this.prefix === "TCR: reset server") {
            if (nickname != "TCR") {
                window.location.reload();
            } else {
                sock.emit('resetserverval');
            }
        }


    }
}

class forceClientRefreshCommand {
    constructor (prefix, sockEmitFlag) {
        this.prefix = prefix; 
        this.sockEmitFlag = sockEmitFlag;
    }

    executeCommand(message) {
        //var extractNickname = message.slice(4).replace(/[^A-Z]+/g, "");
        //if (nickname != "TCR") {return}
        if (message.slice(0, this.prefix.length) != this.prefix) {return}
        //if (studentsArr.includes(extractNickname) === false) {return}
        
        sock.emit(this.sockEmitFlag);

        if (this.prefix === "TCR: reset server") {
            if (nickname != "TCR") {
                window.location.reload();
            } else {
                sock.emit('resetserverval');
            }
        }


    }
}

class idCommand {
    constructor (prefix, sockEmitFlag) {
        this.prefix = prefix; 
        this.sockEmitFlag = sockEmitFlag;
    }

    executeCommand(message) {
        var extractNickname = message.slice(4).replace(/[^A-Z]+/g, "");
        if (nickname != "TCR") {return}
        if (message.slice(0, this.prefix.length) != this.prefix) {return}
        if (studentsArr.includes(extractNickname) === false) {return}
        
        sock.emit(this.sockEmitFlag, extractNickname);
        
        if (this.sockEmitFlag === 'mindControl') {
            sock.emit('chat-to-server', "Mind control mode active = " + extractNickname);
        }
        
    }
}

class numAndIdCommand {
    constructor (prefix, sockEmitFlag) {
        this.prefix = prefix; 
        this.sockEmitFlag = sockEmitFlag;
    }

    executeCommand(message) {
        var extractedNum = message.replace(/\D/g,'');
        var extractNickname = message.slice(4).replace(/[^A-Z]+/g, "");
        if (nickname != "TCR") {return}
        if (message.slice(0, this.prefix.length) != this.prefix) {return}
        if (studentsArr.includes(extractNickname) === false) {return}
        
        var studentId = extractNickname;
        var getNum = extractedNum;
        sock.emit(this.sockEmitFlag, { getNum, studentId });
    }
}

const allCommands = [
    new idCommand("TCR: winner ", 'winner'),
    new idCommand("TCR: mind control ", 'mindControl'),
    new numAndIdCommand("TCR: +", 'addSteps'),
    new fixedCommand("TCR: mind control off", 'mindControlOff'),
    new idCommand("TCR: go a2 ", 'teleportPlayerArea2'),
    new idCommand("TCR: go a1 ", 'teleportPlayerMainArea'),
    new idCommand("TCR: go a3 ", 'teleportPlayerArea3')
    //new fixedCommand("TCR: teleport me out", 'teleportMeOut'),
    //new fixedCommand("TCR: teleport me in", 'teleportMeIn'),
    //new fixedCommand("TCR: number of players", '???'),
    //new forceClientRefreshCommand("TCR: reset server", 'resetserverval')
];

//============COMMAND BUILDER======================COMMAND BUILDER===================COMMAND BUILDER==========

    

function appendMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    var div3 = document.getElementById("div3");
    div3.append(messageDiv);
    div3.scrollTop = div3.scrollHeight;
    

    allCommands.forEach((command) => {
        command.executeCommand(message);
    });
    // command1.executeCommand(message);


}



class GridSystemClient {
    constructor(matrix) {
        this.matrix = matrix;
        //this.uiContext = this.#getContext(420, 580, "#111");
        this.outlineContext = this.#getContext(0, 0, "#444");
        //this.topContext = this.#getContext(0, 0, "#111", true);
        this.cellSize = 27;
        this.padding = 2;
        this.students = ["TCR", "LOK", "KSY", "KN", "JT", "CJH", "LSH", "KX", "TJY", "CED"];
        
        this.cdm = {
            area1: [{x:2,y:10},{x:17,y:10},{x:20,y:2},{x:20,y:18},{x:23,y:3},{x:23,y:17},{x:30,y:4},{x:30,y:16},{x:34,y:10}],
            area2: [{x:1,y:8},{x:10,y:10},{x:13,y:1},{x:21,y:13}],
            area3: {x:16,y:2}
        }

        this.p1 = { color: "grey", lable: 2, id: this.students[0] };

        this.p2 = { color: "cyan", lable: 3, id: this.students[1] };
        this.p3 = { color: "orange", lable: 4, id: this.students[2] };
        this.p4 = { color: "pink", lable: 5, id: this.students[3] };
        this.p5 = { color: "darkkhaki", lable: 6, id: this.students[4] };

        this.p6 = { color: "royalblue", lable: 7, id: this.students[5] };
        this.p7 = { color: "yellow", lable: 8, id: this.students[6] };
        this.p8 = { color: "fuchsia", lable: 9, id: this.students[7] };

        this.p9 = { color: "slategrey", lable: 10, id: this.students[8] };
        this.p10 = { color: "white", lable: 11, id: this.students[9] };

    
        this.playersArr = [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6, this.p7, this.p8, this.p9, this.p10];
        this.moveSwitch = 0;
    }

    #renderPlayer(cellVal) {
        let color = "#111";
        let playerId = null;

        if (cellVal === 1) {
            color = "#4488FF";
        } else if (cellVal === 20) {
            playerId = "💰";
        }

        this.playersArr.forEach((player) => {
            if (cellVal === player.lable) {
                color = player.color;
                playerId = player.id;
            }
        });

        return {color, playerId};
    }


    #getCenter(w, h) {
        return {
            x: window.innerWidth / 2 - w / 2 + "px",
            y: window.innerHeight / 2 - h / 2 + "px"
        }
    }

    #getContext(w, h, color = "#111", isTransparent = false) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width = w;
        this.height = this.canvas.height = h;
        this.canvas.style.position = "absolute";
        this.canvas.style.background = color;
        if (isTransparent) {
            this.canvas.style.backgroundColor = "transparent";
        }
        const center = this.#getCenter(w, h);
        this.canvas.style.marginLeft = center.x;
        this.canvas.style.marginTop = center.y;
        document.body.appendChild(this.canvas);

        return this.context;

    }

    render() {
        const w = (this.cellSize + this.padding) * this.matrix[0].length - (this.padding);
        const h = (this.cellSize + this.padding) * this.matrix.length - (this.padding);

        this.outlineContext.canvas.width = w;
        this.outlineContext.canvas.height = h;

        const center = this.#getCenter(w, h);
        //this.outlineContext.canvas.style.marginLeft = center.x;
        //console.log(center.y);
        this.outlineContext.canvas.style.marginLeft = "10px";
        this.outlineContext.canvas.style.marginTop = "2px";

        /* this.topContext.canvas.style.marginLeft = center.x;
        this.topContext.canvas.style.marginTop = center.y; */

        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                const cellVal = this.matrix[row][col];

                var plyrDet = this.#renderPlayer(cellVal);
                
                this.outlineContext.fillStyle = plyrDet.color;
                this.outlineContext.fillRect(col * (this.cellSize + this.padding),
                    row * (this.cellSize + this.padding),
                    this.cellSize, this.cellSize);

                if (plyrDet.playerId != null) {
                    this.outlineContext.font = "13px Times New Roman";
                    this.outlineContext.fillStyle = "black";
                    this.outlineContext.fillText(plyrDet.playerId, col * (this.cellSize + this.padding) + 2,
                        row * (this.cellSize + this.padding) + 18);

                    if (plyrDet.playerId === "💰") {
                    this.outlineContext.font = "20px Times New Roman";
                    this.outlineContext.fillStyle = "black";
                    this.outlineContext.fillText(plyrDet.playerId, col * (this.cellSize + this.padding) + 2,
                        row * (this.cellSize + this.padding) + 21);
                    }
                }


            }
        }

        if (this.matrix.length === 21) {
            this.outlineContext.fillStyle = "red";
            this.outlineContext.fillRect(29 * (this.cellSize + this.padding),
                    1 * (this.cellSize + this.padding),
                    this.cellSize, this.cellSize);
            this.outlineContext.fillRect(29 * (this.cellSize + this.padding),
                    19 * (this.cellSize + this.padding),
                    this.cellSize, this.cellSize);

            
            this.cdm.area1.forEach((coordinate) => {
                this.outlineContext.fillStyle = "goldenrod";
                this.outlineContext.fillRect(coordinate.x * (this.cellSize + this.padding),
                    coordinate.y * (this.cellSize + this.padding),
                    this.cellSize, this.cellSize);

                this.outlineContext.fillStyle = "black";
                this.outlineContext.font = "10px Times New Roman";
                this.outlineContext.fillText("CDM", coordinate.x * (this.cellSize + this.padding) + 2,
                    coordinate.y * (this.cellSize + this.padding) + 21);
            });

        }
        

        if (this.matrix.length === 20) {
            this.outlineContext.fillStyle = "red";
            this.outlineContext.fillRect(1 * (this.cellSize + this.padding),
                    3 * (this.cellSize + this.padding),
                    this.cellSize, this.cellSize);

            this.cdm.area2.forEach((coordinate) => {
                this.outlineContext.fillStyle = "goldenrod";
                this.outlineContext.fillRect(coordinate.x * (this.cellSize + this.padding),
                    coordinate.y * (this.cellSize + this.padding),
                    this.cellSize, this.cellSize);

                this.outlineContext.fillStyle = "black";
                this.outlineContext.font = "10px Times New Roman";
                this.outlineContext.fillText("CDM", coordinate.x * (this.cellSize + this.padding) + 2,
                    coordinate.y * (this.cellSize + this.padding) + 21);
            });
        }

        if (this.matrix.length === 18) {
            this.outlineContext.fillStyle = "red";
            this.outlineContext.fillRect(24 * (this.cellSize + this.padding),
                    15 * (this.cellSize + this.padding),
                    this.cellSize, this.cellSize);

            this.outlineContext.fillStyle = "goldenrod";
            this.outlineContext.fillRect(this.cdm.area3.x * (this.cellSize + this.padding),
                this.cdm.area3.y * (this.cellSize + this.padding),
                this.cellSize, this.cellSize);
            this.outlineContext.fillStyle = "black";
            this.outlineContext.font = "10px Times New Roman";
            this.outlineContext.fillText("CDM", this.cdm.area3.x * (this.cellSize + this.padding) + 2,
                this.cdm.area3.y * (this.cellSize + this.padding) + 21);
        }
        

        // alert(this.outlineContext.canvas.width)
        // alert(this.outlineContext.canvas.height)
    }
}


createChatDivs();

document.addEventListener("keydown", (e) => {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.view.event.preventDefault();
    }
    //e.view.event.preventDefault();
    sock.emit('keyPress', e.keyCode);
});


//============================================================================================================
sock.on('chat-to-clients', data => {
    appendMessage(data);
});

sock.on('loadMatrix', (data) => {

    var i = 0;
    elementsArr.forEach((element) => {
        element.innerHTML = data.playersArr[i].id + " Stps: " + data.playersArr[i].steps + "/45 || Wllt: " + data.playersArr[i].wallet + "/1000 || Ttl: " + data.playersArr[i].total;


        if (data.playersArr[i].area === "mainArea" && data.playersArr[i].id === nickname) {
            const clientRender = new GridSystemClient(data.sendGridMatrix1);
            clientRender.render();
        }
        if (data.playersArr[i].area === "mainArea2" && data.playersArr[i].id === nickname) {
            const clientRender = new GridSystemClient(data.sendGridMatrix1);
            clientRender.render();
        }
        if (data.playersArr[i].area === "area2" && data.playersArr[i].id === nickname) {
            // var canvas = document.querySelector("canvas");
            // canvas.parentNode.removeChild(canvas);
            const clientRender = new GridSystemClient(data.sendGridMatrix2);
            clientRender.render();
        }
        if (data.playersArr[i].area === "area3" && data.playersArr[i].id === nickname) {
            const clientRender = new GridSystemClient(data.sendGridMatrix3);
            clientRender.render();
        }

        i++;
    });
   
});
sock.on('sendMatrix', (data) => {

    canvasElements = document.querySelectorAll("canvas");
    canvasElements.forEach((canvas) => {
        canvas.remove();
    });

    var i = 0;
    elementsArr.forEach((element) => {
        element.innerHTML = data.playersArr[i].id + " Stps: " + data.playersArr[i].steps + "/45 || Wllt: " + data.playersArr[i].wallet + "/1000 || Ttl: " + data.playersArr[i].total;

        if (data.playersArr[i].area === "mainArea" && data.playersArr[i].id === nickname) {
            const clientRender = new GridSystemClient(data.sendGridMatrix1);
            clientRender.render();
        }
        if (data.playersArr[i].area === "mainArea2" && data.playersArr[i].id === nickname) {
            const clientRender = new GridSystemClient(data.sendGridMatrix1);
            clientRender.render();
        }
        if (data.playersArr[i].area === "area2" && data.playersArr[i].id === nickname) {
            const clientRender = new GridSystemClient(data.sendGridMatrix2);
            clientRender.render();
        }
        if (data.playersArr[i].area === "area3" && data.playersArr[i].id === nickname) {
            const clientRender = new GridSystemClient(data.sendGridMatrix3);
            clientRender.render();
        }

        i++;
    });
   
});

// sock.on('sendBlankMatrix', () => {
    
//     var canvas = document.querySelector("canvas");

//     canvas.parentNode.removeChild(canvas);
    
//     var context = canvas.getContext('2d');
//     canvas.style.background = 'black';
//     context.clearRect(0, 0, canvas.width, canvas.height);
// });
