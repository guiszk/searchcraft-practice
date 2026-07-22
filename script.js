function run(){
    //get layouts
    var newlayoutfull = document.getElementById("newlayout").value.replace(/^\s+|\s+$/g, '').toLowerCase();
    var newlayout = newlayoutfull.split("\n");

    var oglayoutfull = document.getElementById("oglayout").value.replace(/^\s+|\s+$/g, '').toLowerCase();
    var oglayout = oglayoutfull.split("\n");

    var shiftlayoutfull = document.getElementById("shiftlayout").value.replace(/^\s+|\s+$/g, '').toLowerCase();
    var shiftlayout = shiftlayoutfull.split("\n");

    prevdiv = document.getElementById("keyboardpreview");
    prevdiv.innerHTML = "";

    shiftdiv = document.getElementById("shiftpreview");
    shiftdiv.innerHTML = "";

    itemdiv = document.getElementById("item");
    itemdiv.style = 'display: block';


    //define extra keys
    //const extras = ['Tab', 'Caps', 'Shift', 'aaaaaaa']

    //errors
    if(newlayoutfull.length > oglayoutfull.length) {
        alert("Error: new layout doesn't fit keyboard.");
        return 1;
    }

    if(newlayoutfull.length > oglayoutfull.length) {
        alert("Error: new layout doesn't fit keyboard.");
        return 1;
    }

    //reset button div position after first run
    document.getElementById("buttonsdiv").style = "margin-top: 0px;";
  

    renderkeys(newlayout, oglayout, prevdiv, "orange", false);
    renderkeys(shiftlayout, oglayout, shiftdiv, "#40b3ff", true);

    chooseitem();
}

function renderkeys(layout, oglayout, prevdiv, bordercol, caps) {
    keysize = 15;
    const extras = ['Tab', 'Caps', 'Shift', 'aaaaaaa']


    //const element = array[k];
    for (let i = 0; i < oglayout.length; i++) {
        newline = document.createElement("div");
        newline.style = "display:flex;";

        // add extra keys
        if(i>0) {
            extrael = document.createElement("div");
            extrael.innerHTML = extras[i];
            extrael.style = `color: transparent; width: auto; height: ${keysize}px; border-color: #dbdbdb36; align-items: center; justify-content: center; border-style: solid; display:flex; padding: 10px; margin: 5px; border-radius: 5px`;
            extrael.classList += ["key_" + extras[i]];
            newline.appendChild(extrael);
        }

        //iterate through rows
        for (let j = 0; j < oglayout[i].length; j++) {
            newel = document.createElement("div");
            newel.style = `font-weight:bold; width: ${keysize}px; height: ${keysize}px; border-color: gray; align-items: center; justify-content: center; border-style: solid; display:flex; padding: 10px; margin: 5px; border-radius: 5px`;
            
            
            if(j < layout[i].length) {
                newel.innerHTML = caps ? layout[i][j].toUpperCase() : layout[i][j].toLowerCase();
                newel.classList += ["key_" + layout[i][j]];
                if(layout[i][j] != oglayout[i][j]) {
                    newel.style = `font-weight:bold; width: ${keysize}px; height: ${keysize}px; border-color: ${bordercol}; align-items: center; justify-content: center; border-style: solid; display:flex; padding: 10px; margin: 5px; border-radius: 5px`;
                }
            } else {
                newel.innerHTML = caps ? oglayout[i][j].toUpperCase() : oglayout[i][j].toLowerCase();
                newel.classList += ["key_" + oglayout[i][j]];
            }
            
            newline.appendChild(newel);
        }
        prevdiv.appendChild(newline)
    }


    //add spacebar
    newline = document.createElement("div");
    newline.style = "display:flex; margin-left: 160px";
    spacebar = document.createElement("div");
    spacebar.style = `width: 300px; height: ${keysize+5}px; border-color: gray; align-items: center; justify-content: center; border-style: solid; display:flex; padding: 5px; margin: 5px; border-radius: 5px`;
    spacebar.classList += ["key_ "]
    newline.appendChild(spacebar);
    prevdiv.appendChild(newline);

}

function chooseitem() {
    pressnum = 0;

    shortcuts = document.getElementById("shortcuts").value.replace(/^\s+|\s+$/g, '').split("\n");
    chosen = shortcuts[Math.floor(Math.random() * shortcuts.length)];
    item = chosen.split("::")[0];
    sc = chosen.split("::")[1];

    itemdiv = document.getElementById("item");

    namediv = document.getElementById("namediv");
    shortcutdiv = document.getElementById("shortcutdiv");

    namediv.innerHTML = item;
    shortcutdiv.innerHTML = sc;

    return([item, sc]);
}

var pressnum = 0;

function colorchange(key, col) {
    for (let i = 0; i < document.getElementsByClassName("key_"+key).length; i++) {
        const e = document.getElementsByClassName("key_"+key)[i];
        e.style.backgroundColor = col;
        setTimeout(() => {
            e.style.backgroundColor = "transparent";
        }, 500);
    }
}

var shiftheld = false;

document.addEventListener('keydown', (event) => {
    //prevent spacebar clicking button
    if (event.keyCode === 32) { 
        event.preventDefault(); 
    }
    shortcutval = document.getElementById("shortcutdiv").innerText;
    
    prevdiv = document.getElementById("keyboardpreview");
    shiftdiv = document.getElementById("shiftpreview");

    var newlayoutfull = document.getElementById("newlayout").value.replace(/^\s+|\s+$/g, '').toLowerCase() + " ";
    var newlayout = newlayoutfull.split("\n");
    var oglayoutfull = document.getElementById("oglayout").value.replace(/^\s+|\s+$/g, '').toLowerCase() + " ";
    var oglayout = oglayoutfull.split("\n");
    var shiftlayoutfull = document.getElementById("shiftlayout").value.replace(/^\s+|\s+$/g, '').toLowerCase();
    var shiftlayout = shiftlayoutfull.split("\n");
    var switchedlayout = "";
    var switchedshiftlayout = "";

    for (let i = 0; i < oglayout.length; i++) {
        for (let j = 0; j < oglayout[i].length; j++) {
            if(j < newlayout[i].length) {
                switchedlayout += newlayout[i][j];
            } else {
                switchedlayout += oglayout[i][j];
            }

            if(j < shiftlayout[i].length) {
                switchedshiftlayout += shiftlayout[i][j];
            } else {
                switchedshiftlayout += oglayout[i][j];
            }
        }
    }

    //console.log(switchedlayout);
    //console.log(switchedshiftlayout);
    //console.log(oglayoutfull);
    
    keyloc = oglayoutfull.replace(/(\r\n|\n|\r)/gm, "").indexOf(event.key.toLowerCase());


    sim_key = shiftheld ? switchedshiftlayout[keyloc] : switchedlayout[keyloc];
    //console.log(sim_key, event.key);

    if(!["Alt", "Control", "Tab"].includes(sim_key)) {
        if(event.key == "Shift") {
            shiftheld = true;
            prevdiv.style = "display: none";
            shiftdiv.style = "display: block";
        }
        if((sim_key == shortcutval[0] && pressnum != 1) || sim_key == shortcutval[pressnum]) {
            pressnum += 1;
            //console.log("Correct!" + sim_key); 
            colorchange(sim_key, "#00ff2253");
        } else {
            colorchange(sim_key, "#ff000087");
            pressnum = 0;
        }
        
        if(pressnum == shortcutval.length) {
            chooseitem();
        }
    }
});

document.addEventListener('keyup', (event) => {
    if(event.key == "Shift") {
        shiftheld = false;
        prevdiv.style = "display: block";
        shiftdiv.style = "display: none";
    }
});

function randomlayout() {
    var keys = 'x8+45swortaebndpickg';
    var shuffled = keys.split('').sort(() => Math.random() - 0.5);
    shuffled.splice(5, 0, "\n");
    shuffled.splice(11, 0, "\n");
    shuffled.splice(17, 0, "\n");
    
    document.getElementById('newlayout').value = '`' + shuffled.join("");
    run();
}

function abouttoggle() {
    aboutdiv = document.getElementById("aboutdiv");
    aboutdiv.style.display = (aboutdiv.style.display == "none") ? "block" : "none"
}