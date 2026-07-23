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

    shortcuts = document.getElementById("shortcuts").value.trim().split("\n");
    chosen = shortcuts[Math.floor(Math.random() * shortcuts.length)];
    chosen = chosen.replace("_", " ");
    item = chosen.split("::")[0];
    sc = chosen.split("::")[1];
    console.log(chosen);

    itemdiv = document.getElementById("item");

    namediv = document.getElementById("namediv");
    shortcutdiv = document.getElementById("shortcutdiv");

    if(sc.includes("/")) {
        scs = sc.split("/");
        shortcutdiv.innerHTML = scs[Math.floor(Math.random() * scs.length)];
    } else {
        shortcutdiv.innerHTML = sc;
    }

    namediv.innerHTML = item;

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
    
    // number line changes to ~!@#$%^&*()_+ when shift is pressed
    chosenlayout = shiftheld ? "~!@#$%^&*()_+"+oglayoutfull.slice(13) : oglayoutfull;
    keyloc = chosenlayout.replace(/(\r\n|\n|\r)/gm, "").indexOf(event.key.toLowerCase());


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
    var keys = document.getElementById("newlayout").value.split("\n").join("");
    var shuffled = keys.split('').sort(() => Math.random() - 0.5);
    shuffled.splice(5, 0, "\n");
    shuffled.splice(11, 0, "\n");
    shuffled.splice(17, 0, "\n");
    
    document.getElementById('newlayout').value = shuffled.join("");
    run();
}

function abouttoggle() {
    aboutdiv = document.getElementById("aboutdiv");
    aboutdiv.style.display = (aboutdiv.style.display == "none") ? "block" : "none"
}

// language changing
function layoutchange(lang) {
    switch(lang) {
        case 'nynorsk':
            shortcuts = "Flint and Steel::dj\nBucket::by\nBoat::bå\nIron pick::nha\nIngots::ba/rnb/nba\nBread::rø/ød\nTNT::tnt\nGold pick/Gold helmet::lh\nBed::se\nGarrot::ot/lr\nIron/Stone axe::+8\nIron/Stone sword::nsv\nBars::gi\nSticks::pi\nWool:: u\nBricks+Glowstone::gl\nBricks::h\nWool:: u/it\nGlowstone::es/lø\nSticks::pi\nBeds::se/eng\nAnchors::ps/ea\nBow::oge/bog\nPicks::lha\nBars::gi\nPowder/Eyes::er\nGapple::ep\nTripwire hook::åd/nu/le\nCrossbow::øs";
            layout = "ådbvjy\npserl\nogitu\nønhak";
            shiftlayout = "4+BV8Y\nNSERD\nØGITU\nPLHAK";
            break;
        case 'doog':
            shortcuts = "General Bastion::ro\nBeds::be\nIngots::ngo\nIron Ingots::on i\nIron Axe::on a\nIron Sword::on sw\nIron Axe::+8\nIron Sword::+5\nStone Sword::+4\nDiamond Sword::d sw\nGolden Carrots::rr\nWool::wo\nBed / Bow::ow\nGlowstone::ws\nNether Bricks::ne\nNether Bricks::er\nSticks::tic\nPowder + Eyes::de\nEnder Eyes:: e\nShears::ear\nBow / Crossbow::bow\nRespawn Anchors::aw\nAll Pickaxes::ka\nTripwire Hook::ok\nIron Ingots::ot\nBucket::ke\nGolden Apple::pp\nShield::ie\nFishing Rod:: r\nAll Shovels::5\nIron Bars::bar\nBread::bre\nBoat::oat\nAxes / Pickaxes::x\nGold Nuggets::d n\nFlint and Steel::t a\nPlanks::ks\nDoor + Trapdoor::do";
            layout = '`18+45\nswort\naebnd\npickg';
            shiftlayout = '`18+45\nswort\naebnd\npickg';
            break
        case 'bokmål':
            shortcuts = 'Flint and Steel::ål\nBucket::bø\nBoat::bå\nIron Pick::nha\nIngots::ba\nBread::rø\nTnt::tnt\nIngot::rnb/nba\nGold Pick/Gold Helmet::lhj\nBed::n_/l_\nGarrot::lr\nIron/Stone Axe::nø\nIron/Stone Sword::nsv\nBars::gi\nSticks::pi\nWool::h\nBricks::eg/th\nGlowstone::es/lø\nPowder::lv\nEyes::ye\nBeds::l_\nAnchors::iv\nBow::ue\nPicks::lha\nGapple::lep/epl\nTripwire Hook::nu\nCrossbow::øs';
            layout = '`ueiv5\nplrg\njnha\nåøb4';
            shiftlayout = '`ueiv\nplrg\njnha\nåøb4';
            break
        case 'danish':
            shortcuts = "Ingot::rr\nBread::rø\nIron/stone axe::nø\nGold/wood axe::6\nBucket::pan\nFlint and Steel::_o/g_/å/\nTNT::tn\nBoat::bå\nShears::sa\nStone axe::enø\nStone sword::+4/nsv/ensv\nStone shovel::ensp/ens\nDiamond pick::tha\nStone axe::ø\nIron pick::nha\nChalice craft::dh\nBed + Garrot::n_\nRespawn anchor::no\nStone axe::nø/enø\nStone sword::+4\nStone shovel::nsp/ensp\nIron ingot::rnb\nIron axe::nø/rnø\nIron bars::rnt\nIron sword::nsv/rnsv\nIron shovel::nsp/rnsp\nGold apple::_æ\nNether bricks::ne/th/he\nGlowstone::ød/lø/es\nWool::_u/d_/h\nSticks::pi/nd\nBow::bue\nBed + Garrot::n_\nAnchor::no\nGold pick::dha\nTripwire::nu\nCrossbow::øs";
            layout = "`dhaø\nnsvt\nåuero\næibp";
            shiftlayout = "`dhaø\nnsvt\nåuero\næibp";
            break
        default:
            shortcuts = "General Bastion::ro\nBeds::be\nIngots::ngo\nIron Ingots::on i\nIron Axe::on a\nIron Sword::on sw\nIron Axe::+8\nIron Sword::+5\nStone Sword::+4\nDiamond Sword::d sw\nGolden Carrots::rr\nWool::wo\nBed / Bow::ow\nGlowstone::ws\nNether Bricks::ne\nNether Bricks::er\nSticks::tic\nPowder + Eyes::de\nEnder Eyes:: e\nShears::ear\nBow / Crossbow::bow\nRespawn Anchors::aw\nAll Pickaxes::ka\nTripwire Hook::ok\nIron Ingots::ot\nBucket::ke\nGolden Apple::pp\nShield::ie\nFishing Rod:: r\nAll Shovels::5\nIron Bars::bar\nBread::bre\nBoat::oat\nAxes / Pickaxes::x\nGold Nuggets::d n\nFlint and Steel::t a\nPlanks::ks\nDoor + Trapdoor::do";
            layout = "`1234567890-=\nqwertyuiop[]\nasdfghjkl;'\nzxcvbnm,./";
            shiftlayout = "`x8+45\nbwert\nasdno\npickg";
    } 
    
    document.getElementById('shortcuts').value = shortcuts;
    document.getElementById('newlayout').value = layout;
    document.getElementById('shiftlayout').value = shiftlayout;
    run();
}
