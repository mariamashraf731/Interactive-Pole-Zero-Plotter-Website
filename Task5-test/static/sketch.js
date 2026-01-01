let zeroes =[];
let poles = [];
let allPass=[];
let selectedFilters = [];
let id = 1;
function setup() {
    createCanvas(600, 600);
    maincircle = new Zero(width / 2, height / 2, 300);
    for (let i = -1; i < 2; i++) {
        allPass.push(new AllPass(300 + 75 * i, 225 + 75 * i * i))
        addFilter();
    }
}
function draw() {
    background(0);
    stroke(150);
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
    strokeWeight(3);
    line(0, height, width, height);
    line(width, 0, width, height);
    line(0, 0, 0, height);
    line(0, 0, width, 0);
    maincircle.show('#f00');
    for (let i = 0; i < zeroes.length; i++) {
        zeroes[i].show();   
    }
    for (let i = 0; i < poles.length; i++) {
        poles[i].show();
    }
    for (let i = 0; i < allPass.length; i++) {
        let filterID = "Filter ".concat(i+1);
        if (document.getElementById(filterID).checked) {
            allPass[i].selected = true;
        } else {
            allPass[i].selected = false;
        }
        allPass[i].show();
    }
    selectedFilters = [];
    for(let i = 0; i<allPass.length;i++){
        if(allPass[i].selected){
            selectedFilters.push(allPass[i]);
        }
    }

    fetch("/arrays", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "z": zeroes, "p": poles, "all_pass": allPass })
    }).then(res => {
        console.log("Request complete! response:", res);
    });
}

function doubleClicked() {
    let exist = false;
    let Conj = 2 * ((height / 2) - mouseY );
    for (let i = 0; i < zeroes.length; i++) {
        if (zeroes[i].inRange()) {
            exist = true;
            if (zeroes[i].Conj){
                zeroes.splice(i-1, 2);
            } else if (zeroes[i].hasConj){
                zeroes.splice(i, 2);
            }else{
               zeroes.splice(i, 1); 
            }
        }
    }
    for (let i = 0; i < poles.length; i++) {
        if (poles[i].inRange()) {
            exist = true;
            if (poles[i].Conj) {
                poles.splice(i - 1, 2);
            } else if (poles[i].hasConj) {
                poles.splice(i, 2);
            } else {
                poles.splice(i, 1);
            }
        }
    }

    for (let i = 0; i < allPass.length; i++) {
        if (allPass[i].inRange()) {
            exist = true;
            allPass.splice(i, 1);
        }
    }
    if(maincircle.inRange()){

        if (!exist && document.getElementById("bubble").checked) {
            zeroes.push(new Zero(mouseX, mouseY));
            if(document.getElementById("conj").checked){
                zeroes[zeroes.length - 1].hasConj = true;
                zeroes.push(new Zero(mouseX, mouseY+Conj)); 
                zeroes[zeroes.length-1].Conj =true; 
            }
        }
        if (!exist && document.getElementById("cross").checked){
            poles.push(new Pole(mouseX, mouseY));
            if(document.getElementById("conj").checked){
                poles[poles.length - 1].hasConj = true;
                poles.push(new Pole(mouseX, mouseY + Conj));
                poles[poles.length - 1].Conj = true;
            }
        }
        if (!exist && document.getElementById("allPass").checked) {
            allPass.push(new AllPass(mouseX,mouseY));
            allPass[allPass.length - 1].custom = true;
            allPass[allPass.length - 1].selected = true;
            addFilter();
            }
        }
    }

    function mousePressed(){
    for (let i = 0; i < zeroes.length; i++) {
            zeroes[i].Drag();
    }
    for (let i = 0; i < poles.length; i++) {
            poles[i].Drag();
    }
    for (let i = 0; i < allPass.length; i++) {
            allPass[i].Drag();
    }
}
function mouseReleased(){
    for (let i = 0; i < zeroes.length; i++) {
            zeroes[i].release();
    }
    for (let i = 0; i < poles.length; i++) {
            poles[i].release();
    }
    for (let i = 0; i < allPass.length; i++) {
            allPass[i].release();
    }
}
function removeAll(){
    poles.splice(0, poles.length);
    zeroes.splice(0, zeroes.length);
    allPass.splice(3,allPass.length);
    let ele = document.getElementById('checkboxes');
    ele.innerHTML = '';
    for(let i = 0 ; i <4;i++){
        ele.innerHTML += '<input type="checkbox" id="Filter ' + (i + 1) + '"><label for="Filter' + (i + 1) + '">Filter ' + (i + 1) + '[ ' + allPass[i].X + ' , ' + allPass[i].Y + '] </label><br>';
    }
    id = 4;
}
function removeZeros(){
    zeroes.splice(0, zeroes.length);
}
function removePoles(){
    poles.splice(0, poles.length);
}
function addFilter() {
    let ele = document.getElementById('checkboxes');
    ele.innerHTML = '';
    for (let i = 0; i < id; i++){
        if(allPass[i].selected){
            ele.innerHTML += '<input type="checkbox" id="Filter ' + (i + 1) + '" Checked ><label for="Filter' + (i + 1) + '">Filter ' + (i + 1) + '[ ' + allPass[i].X + ' , ' + allPass[i].Y + '] </label><br>';
        }else{
            ele.innerHTML += '<input type="checkbox" id="Filter ' + (i + 1) + '"><label for="Filter' + (i + 1) + '">Filter ' + (i + 1) + '[ ' + allPass[i].X + ' , ' + allPass[i].Y + '] </label><br>';
        }
    }
    id++;
}
