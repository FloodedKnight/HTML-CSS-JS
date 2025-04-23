function formatNum(num){
    const removeDec = num.toString().split(".")[1]
    for (let i = 0; i != num.toString().length; i += 3){
        // Working on
    }
    let split3 = removeDec.substring
}

function roundDecimals(num, decCount){
    const convert =  10 ** decCount;
    return Math.round(num * convert) / convert;
}

function getNum(id) {
    const btn = document.getElementById(id);
    return parseInt(btn.textContent);
}

function btnAdd(id) {
    const btn = document.getElementById(id);
    let num = parseInt(btn.textContent);
    num++;
    btn.textContent = num;
}

function btnSub(id) {
    const btn = document.getElementById(id);
    let num = parseInt(btn.textContent);
    num = num - 1;
    btn.textContent = num;
}

function operate(operator) {
    var sum;
    var flag = false;
    if (operator === "+") {
        sum = getNum('btn1') + getNum('btn2');
    } else if (operator === "*") {
        sum = getNum('btn1') * getNum('btn2');
    }
    else if (operator === "/") {
        sum = getNum('btn1') / getNum('btn2');

        if (sum.toString().split('.')[1]?.length > 5) {
            flag = true;
            sum = roundDecimals(getNum('btn1') / getNum('btn2'), 5);
        }
    }

    else if (operator === "-") {
        sum = getNum('btn1') - getNum('btn2');
    }
    const p = document.getElementById('displayNum');
    p.textContent = "\n" + sum.toString();
    if (flag === true){
        p.textContent = "\n≈" + sum;
    }
}
