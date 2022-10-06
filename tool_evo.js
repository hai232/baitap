WSS = WebSocket;
var temp1 = null
WebSocket = class WebSocket extends WSS {
    constructor(name) {
    super(name);
    this.type = "WebSocket";
    console.log(this)
    if (temp1 == null) {
        temp1 = (this);
    }
    };
};


g = document.createElement('div');
g.setAttribute("id", "dragMe");
g.setAttribute("class", "draggable");
g.style.cursor = "move";
g.innerText = 123123
g.style.position = "absolute";
g.style.zIndex = 1000;
g.style.height = "250px";
g.style.width = "350px";
g.style.opacity = 0.85;
g.style.fontSize = "50px";
g.style.backgroundColor = 'powderblue'
g.style.top = '0px'
document.body.appendChild(g);

    // The current position of mouse
let x = 0;
let y = 0;

// Query the element
const ele = document.getElementById('dragMe');

// Handle the mousedown event
// that's triggered when user drags the element
const mouseDownHandler = function (e) {
    // Get the current mouse position
    x = e.clientX;
    y = e.clientY;

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    // Set the position of element
    ele.style.top = `${ele.offsetTop + dy}px`;
    ele.style.left = `${ele.offsetLeft + dx}px`;

    // Reassign the position of mouse
    x = e.clientX;
    y = e.clientY;
};

const mouseUpHandler = function () {
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

ele.addEventListener('mousedown', mouseDownHandler);

    score = 0;
    num = 0;
    stand_rate = 0;
    hit_rate = 0;
    deck = [];
    diem = [];
    for (let index = 1; index < 10; index++) {
        for (let j = 0; j < 32; j++) {
            deck.push(index);
        }
    }
    for (let j = 0; j < 128; j++) {
        deck.push(10);
    }

function Calculate(d , p){
    stand_rate = 0;
    hit_rate = 0;
    score = 0;
    num = 0;
    diem[17] = 0;
    diem[18] = 0;
    diem[19] = 0;
    diem[20] = 0;
    diem[21] = 0;
    diem[22] = 0;
    diem[0] = 0;

    let dealer_score = d
    let player_score = p
    scan_dealer([dealer_score])

    scan_player(player_score)
    if (p.includes(1)) {
        p = p[0]+1 +'/' + (p[0]+11)
    }
    if (d == 1) {
        hit_rate = hit_rate/(1 - diem[22])
        stand_rate = stand_rate/(1 - diem[22])
    }

    g.innerHTML = '</br></br>Dealer : ' + d.toString() + '</br></br></br></br>Plyer : ' + p.toString() + '</br></br></br></br>hit: ' + (Math.round(hit_rate * 1000).toString() / 10) + '%'  + '</br></br></br></br>stand: ' + (Math.round(stand_rate * 1000) / 10).toString() + '%'
    
    

    if(hit_rate > stand_rate){
        if(hit_rate > 0.501){
            g.innerHTML += '</br></br></br></br> Double '
        }else{
            g.innerHTML += '</br></br></br></br> ' + (hit_rate * 20).toFixed(3)
        }
    }
    if(stand_rate > hit_rate){
        g.innerHTML += '</br></br></br></br>=> ' + (stand_rate * 20).toFixed(3)
    }

    

}

function scan_dealer(arr) {
    for (let index = 1; index < 11; index++) {
        tmp = [...arr];
        tmp.push(index)
        if (tmp.reduce((a, b) => a + b, 0) > 16) {
            if (tmp.reduce((a, b) => a + b, 0) < 22) {
                diem[tmp.reduce((a, b) => a + b, 0)] += stcal(tmp)
            }else {diem[0] += stcal(tmp)}
        }else{
            if (tmp.includes(1) && tmp.reduce((a, b) => a + b, 0) > 6 && tmp.reduce((a, b) => a + b, 0) < 12) {
                if ((tmp[0] == 1 && tmp[1] == 10) || (tmp[0] == 10 && tmp[1] == 1)) {
                    diem[22] += stcal(tmp)
                }else{
                    diem[tmp.reduce((a, b) => a + b, 0) + 10] += stcal(tmp)
                }
            }else {scan_dealer(tmp)}
        }
    }
}

function scan_player(arr) {
    hit_rate = 0
    stand_rate = 0
    tmp = [...arr];
    diem_stand = tmp.reduce((a, b) => a + b, 0)
    if (tmp.includes(1) && tmp.reduce((a, b) => a + b, 0) <= 11) {
        diem_stand = tmp.reduce((a, b) => a + b, 0) + 10
    }
    if (diem_stand <= 21) {
        for (let i = 17; i < diem_stand; i++) {
            stand_rate += diem[i]
        }
    }
    if (diem_stand > 16 && diem_stand < 22 ) {
        stand_rate += (diem[diem_stand] / 2)
    }
    stand_rate += diem[0]

    for (let index = 1; index < 11; index++) {
        tmp = [...arr];
        tmp.push(index)

        if (tmp.includes(1)) {
            if (tmp.reduce((a, b) => a + b, 0) <= 11) {
                tmp.push(10)
            }
        }

        chance = deck.count(index) / deck.length
        if(tmp.reduce((a, b) => a + b, 0) <= 21){
            if (tmp.reduce((a, b) => a + b, 0) > 16) {
                for (let j = 17; j < tmp.reduce((a, b) => a + b, 0); j++) {
                    hit_rate += (chance * diem[j])
                }
                hit_rate += (chance * diem[tmp.reduce((a, b) => a + b, 0)]) / 2
            }
            hit_rate += chance * diem[0]
        }
    }
}

function stcal(arr){
    sum = 1;
    for (let index = 1; index < arr.length; index++) {
        sum = sum * (deck.count(arr[index]) - arr.slice(1,index).count(arr[index]) )  / ( deck.length - index + 1 ) 
    }
    return sum
}

    function Remove(card){
        if (card==0) {
            return
        }
        deck.splice(deck.indexOf(Number(card)), 1)
    }


    Object.defineProperties(Array.prototype, {
    count: {
        value: function(value) {
            return this.filter(x => x==value).length;
        }
    }
    });



    myseat = 7
    

    card_list = []
    old_list = []


    temp1.onmessage = function(e){
        data = JSON.parse(e.data)
        if(data.type == 'blackjack.v3.game' && typeof(data.args.dealer) == 'object'){
            card_list = []
            Object.keys(data.args.dealer.cards).forEach(key => {
            card_list.push(data.args.dealer.cards[key].value)
        })

        Object.keys(data.args.seats).forEach(key => {
            data.args.seats[key].first.cards.forEach(element => {
                card_list.push(element.value)
            });
        })
            
        myArray = [...card_list];
        old_list.forEach(element => {
            const index = card_list.indexOf(element);
            if (index > -1) { // only splice array when item is found
            card_list.splice(index, 1); // 2nd parameter means remove one item only
            }
        });
        old_list = [...myArray];
        console.log(card_list)

        card_list.forEach(element => {
            new_card = element.substring(0,1)
            if (new_card < 10) {
                Remove(Number(new_card))
            }
            if (new_card == 'A') {
                Remove(1)
            }
            if (new_card == 'J' || new_card == 'T' || new_card == 'Q' || new_card == 'K') {
                Remove(10)
            }
        });
if(typeof(data.args.seats[7-myseat].first.hardScore) == 'number'){
    Calculate(data.args.dealer.score , [data.args.seats[7-myseat].first.score-11,1])
}else{
    Calculate(data.args.dealer.score , [data.args.seats[7-myseat].first.score])
}
        }
    }