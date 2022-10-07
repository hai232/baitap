function check(){
card_test = [];
for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
        card_test.push([i,j])
    }
}
rmd = [];

function scan_player_2(arr) {
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
        chance = (deck.count(index) - rmd.count(index)) / (deck.length-rmd.length)
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


function stcal_2(arr ){
    tmpp = [...deck];
    for(i = 0 ; i < rmd.length ; i++){
        if (rmd[i] != 0) {
            tmpp.splice(tmpp.indexOf(rmd[i]), 1)
        }
    }
    sum = 1;
    
    for (let index = 1; index < arr.length; index++) {
        sum = sum * (tmpp.count(arr[index]) - arr.slice(1,index).count(arr[index]) )  / ( tmpp.length - index + 1 ) 
    }
    return sum
}

function scan_dealer_2(arr) {
    for (let index = 1; index < 11; index++) {
        tmp = [...arr];
        tmp.push(index)
        if (tmp.reduce((a, b) => a + b, 0) > 16) {
            if (tmp.reduce((a, b) => a + b, 0) < 22) {
                diem[tmp.reduce((a, b) => a + b, 0)] += stcal_2(tmp)
            }else {diem[0] += stcal_2(tmp)}
        }else{
            if (tmp.includes(1) && tmp.reduce((a, b) => a + b, 0) > 6 && tmp.reduce((a, b) => a + b, 0) < 12) {
                if ((tmp[0] == 1 && tmp[1] == 10) || (tmp[0] == 10 && tmp[1] == 1)) {
                    diem[22] += stcal_2(tmp)
                }else{
                    diem[tmp.reduce((a, b) => a + b, 0) + 10] += stcal_2(tmp)
                }
            }else {scan_dealer_2(tmp)}
        }
    }
}



function test_player(arr) {
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
        stand_rate += diem[0]
    }
    if (diem_stand > 16 && diem_stand < 22 ) {
        stand_rate += (diem[diem_stand] / 2)
    }
    for (let index = 1; index < 11; index++) {
        tmp = [...arr];
        tmp.push(index)
        if (tmp.includes(1)) {
            if (tmp.reduce((a, b) => a + b, 0) <= 11) {
                tmp.push(10)
            }
        }
        chance = (deck.count(index) - rmd.count(index)) / (deck.length-rmd.length)
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
    if (hit_rate > stand_rate && tmp.length<8) {
        score_array = []
        is_multi_card = true
        for (let index = 1; index < 11; index++) {
            test_player(arr.concat([index]))
        }
    }else{
        tong += stcal_2(arr.slice(2)) * stand_rate
        can_double = false
        hit_rate = tong
        stand_rate = 0
    }
}


a= []
for (let i = 1; i < 11; i++) {
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
    rmd = [i]
    scan_dealer_2([i]);
    for (let j = 0; j < card_test.length; j++) {
        double_chance = 0;
        tong = 0;
        rmd = [card_test[j][0],card_test[j][1],i]
        console.log(rmd)
        scan_player_2([card_test[j][0],card_test[j][1]]);
        double_chance = hit_rate;
        stand_chance = stand_rate;

        test_player([0,card_test[j][0],card_test[j][1]]);
        
        if((double_chance - 0.5)*2 > hit_rate - 0.5 && double_chance > 0.5) {
            hit_rate = (double_chance - 0.5)*2 + 0.5
        }
        if(card_test[j][0] == card_test[j][1] && card_test[j][0] !=5 ){
            tong = 0;
            test_player([0,card_test[j][0],card_test[j][1]]);
            stand_pair = hit_rate;
            tong = 0;
            test_player([0,0,card_test[j][0]]);
            split_rate = hit_rate
            if(card_test[j][0] == 1){
                scan_player_2([1]);
                split_rate = hit_rate
            }
            if (2 * split_rate - 1 > stand_pair - 0.5 || 1 - 2 * split_rate < 0.5 - stand_pair){
                hit_rate = (split_rate - 0.5)*2 + 0.5
            }else{
                double_chance = 0;
                tong = 0;
                scan_player_2([0,card_test[j][0],card_test[j][1]]);
                double_chance = hit_rate;
                stand_chance = stand_rate;
                test_player([0,card_test[j][0],card_test[j][1]]);
            }
        }
        if(card_test[j][0] + card_test[j][1] == 11 && card_test[j].includes(1)){
            hit_rate = 0;
            for (let index = 17; index < 22; index++) {
                hit_rate += diem[index]
            }
            hit_rate += diem[0]
            hit_rate = hit_rate * 1.25
            hit_rate += diem[22]/2
        }
        rmd = []
        a.push(hit_rate > stand_rate ? hit_rate*stcal_2([0,i].concat(card_test[j])) : stand_rate*stcal_2([0,i].concat(card_test[j])))
    }
}
console.log(a.reduce((a, b) => a + b, 0))
}
