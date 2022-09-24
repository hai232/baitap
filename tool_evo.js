WSS = WebSocket;
var temp1 = null
WebSocket = class WebSocket extends WSS {
    constructor(name) {
    super(name);
    this.type = "WebSocket";
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
g.style.height = "100px";
g.style.width = "140px";
g.style.opacity = 0.85;
g.style.fontSize = "20px";
g.style.backgroundColor = 'powderblue'
g.style.top = '0px'
document.body.appendChild(g);
let x = 0;
let y = 0;
const ele = document.getElementById('dragMe');
const mouseDownHandler = function (e) {
    x = e.clientX;
    y = e.clientY;
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};
const mouseMoveHandler = function (e) {
    const dx = e.clientX - x;
    const dy = e.clientY - y;
    ele.style.top = `${ele.offsetTop + dy}px`;
    ele.style.left = `${ele.offsetLeft + dx}px`;
    x = e.clientX;
    y = e.clientY;
};
const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};
ele.addEventListener('mousedown', mouseDownHandler);
    statistic = []
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
        diem[0] = 0;
        statistic = []
        let dealer_score = d
        let player_score = p
        scan_dealer([dealer_score])
        scan_player([player_score])
        g.innerHTML = '</br></br>Dler : ' + d.toString() + '</br></br></br></br>Plyer : ' + p.toString() + '</br></br></br></br>hit: ' + (Math.round(hit_rate * 1000).toString() / 10) + '%'  + '</br></br></br></br>stand: ' + (Math.round(stand_rate * 1000) / 10).toString() + '%'
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
                    statistic.push( stcal(tmp))
                    diem[tmp.reduce((a, b) => a + b, 0) + 10] += stcal(tmp)
                }else {scan_dealer(tmp)}
            }
        }
    }
    function scan_player(arr) {
        hit_rate = 0
        stand_rate = 0
        tmp = [...arr];
            for (let i = 17; i < tmp.reduce((a, b) => a + b, 0); i++) {
                stand_rate += diem[i]
            }
            if (tmp.reduce((a, b) => a + b, 0) > 16 && tmp.reduce((a, b) => a + b, 0) < 22 ) {
                stand_rate += (diem[tmp.reduce((a, b) => a + b, 0)] / 2)
            }
        stand_rate += diem[0]
        for (let index = 1; index < 11; index++) {
            tmp = [...arr];
            tmp.push(index)

            if (index == 1) {
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
        deck.splice(deck.indexOf(Number(card)), 1)
    }


    Object.defineProperties(Array.prototype, {
    count: {
        value: function(value) {
            return this.filter(x => x==value).length;
        }
    }
    });

    function popup(){
    window.open(window.location.href,name,'width=560,height=340,toolbar=0,menubar=0,location=0');  
    window.close()
    }
    function Remove_input(){
        for (let index = 0; index < document.getElementById('remove').value.length; index++) {
            Remove(document.getElementById('remove').value.charAt(index));
        }
        document.getElementById('remove').value = ''
    }
    myseat = 7
    card_list = []
    old_list = []
    g.innerHTML = 'mý111seat'
setTimeout(zz=> {
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
            Calculate(data.args.dealer.score , data.args.seats[7-myseat].first.score)
        }
    }
    g.innerHTML = temp1.onmessage.toString();
}, 5000);
