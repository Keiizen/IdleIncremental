function E(x){return new Decimal(x)};

const EINF = Decimal.dInf
const FPS = 20

function uni(x) { return E(1.5e56).mul(x) }
function mlt(x) { return uni("ee9").pow(x) }

Decimal.prototype.modular=Decimal.prototype.mod=function (other){
    other=E(other);
    if (other.eq(0)) return E(0);
    if (this.sign*other.sign==-1) return this.abs().mod(other.abs()).neg();
    if (this.sign==-1) return this.abs().mod(other.abs());
    return this.sub(this.div(other).floor().mul(other));
};

Decimal.prototype.format = function (acc=4, max=12) { return format(this.clone(), acc, max) }

Decimal.prototype.formatGain = function (gain, mass=false) { return formatGain(this.clone(), gain, mass) }

function calc(dt) {
    let du_gs = tmp.preQUGlobalSpeed.mul(dt)
    let inf_gs = tmp.preInfGlobalSpeed.mul(dt)

    if (tmp.pass<=0) {
        player.mass = player.mass.add(tmp.massGain.mul(dt))
       
    }

    tmp.pass = Math.max(0,tmp.pass-1)

    player.time += dt

   
    
}

function getPlayerData() {
    let s = {
       points: E(0),
        rp: {
            points: E(0),
            unl: false,
        },
        options: {
            font: 'Arial',
            notation: 'standard',
            massDis: 0,

            nav_hide: [true, false]
        },
        confirms: {},
        offline: {
            active: true,
            current: Date.now(),
            time: 0,
        },
        time: 0,
    }

   
        
    return s
}

function wipe(reload=false) {
    if (reload) {
        wipe()
        save()
        location.reload()
    }
    else player = getPlayerData()
}

function loadPlayer(load) {
    const DATA = getPlayerData()
    player = deepNaN(load, DATA)
    player = deepUndefinedAndDecimal(player, DATA)
    convertStringToDecimal()
  
}

function clonePlayer(obj,data) {
    let unique = {}

    for (let k in obj) {
        if (data[k] == null || data[k] == undefined) continue
        unique[k] = Object.getPrototypeOf(data[k]).constructor.name == "Decimal"
        ? E(obj[k])
        : typeof obj[k] == 'object'
        ? clonePlayer(obj[k],data[k])
        : obj[k]
    }

    return unique
}

function deepNaN(obj, data) {
    for (let k in obj) {
        if (typeof obj[k] == 'string') {
            if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) obj[k] = data[k]
        } else {
            if (typeof obj[k] != 'object' && isNaN(obj[k])) obj[k] = data[k]
            if (typeof obj[k] == 'object' && data[k] && obj[k] != null) obj[k] = deepNaN(obj[k], data[k])
        }
    }
    return obj
}

function deepUndefinedAndDecimal(obj, data) {
    if (obj == null) return data
    for (let k in data) {
        if (obj[k] === null) continue
        if (obj[k] === undefined) obj[k] = data[k]
        else {
            if (Object.getPrototypeOf(data[k]).constructor.name == "Decimal") obj[k] = E(obj[k])
            else if (typeof obj[k] == 'object') deepUndefinedAndDecimal(obj[k], data[k])
        }
    }
    return obj
}

function convertStringToDecimal() {
    
}

function cannotSave() { return tmp.supernova.reached && player.supernova.times.lt(1) && !quUnl() || tmp.inf_reached && !hasInfUpgrade(16) }

function save(){
    let str = btoa(JSON.stringify(player))
    if (cannotSave() || findNaN(str, true)) return
    if (localStorage.getItem("testSave") == '') wipe()
    localStorage.setItem("testSave",str)
    tmp.prevSave = localStorage.getItem("testSave")
    if (tmp.saving < 1) {addNotify("Game Saved", 3); tmp.saving++}
}

function load(x){
    if(typeof x == "string" & x != ''){
        loadPlayer(JSON.parse(atob(x)))
    } else {
        wipe()
    }
}

function exporty() {
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) {
        addNotify("Error Exporting, because it got NaNed")
        return
    }
    save();
    let file = new Blob([str], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "Incremental Mass Rewritten Save - "+new Date().toGMTString()+".txt"
    a.click()
}

function export_copy() {
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) {
        addNotify("Error Exporting, because it got NaNed")
        return
    }

    let copyText = document.getElementById('copy')
    copyText.value = str
    copyText.style.visibility = "visible"
    copyText.select();
    document.execCommand("copy");
    copyText.style.visibility = "hidden"
    addNotify("Copied to Clipboard")
}

function importy() {
    createPrompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE",'import',loadgame=>{
        let st = ""
        if (loadgame.length <= 100) st = convertStringIntoAGY(loadgame)
        if (ssf[2](loadgame)) return
        if (st == 'OJY$VFe*b') {
            addNotify('monke<br><img style="width: 100%; height: 100%" src="https://i.kym-cdn.com/photos/images/original/001/132/314/cbc.jpg">')
            return
        }
        else if (st == 'p4H)pb{v2y5?g!') {
            addNotify('2+2=5<br><img src="https://cdn2.penguin.com.au/authors/400/106175au.jpg">')
            return
        }
        else if (st == 'L5{W*oI.NhA-lE)C1#e') {
            addNotify('<img src="https://steamuserimages-a.akamaihd.net/ugc/83721257582613769/22687C6536A50ADB3489A721A264E0EF506A89B3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false">',6)
            return
        }
        else if (st == 'a+F4gro<?/Sd') {
            addNotify('YOU ARE CURSED FOREVER!!!')
            player.options.font = 'Arial'
            return
        }
        if (loadgame != null) {
            let keep = player
            try {
                setTimeout(()=>{
                    if (findNaN(loadgame, true)) {
                        addNotify("Error Importing, because it got NaNed")
                        return
                    }
                    load(loadgame)
                    save()
                    resetTemp()
                    loadGame(false)
                    location.reload()
                }, 200)
            } catch (error) {
                addNotify("Error Importing")
                player = keep
            }
        }
    })
}

function loadGame(start=true, gotNaN=false) {
    if (!gotNaN) tmp.prevSave = localStorage.getItem("testSave")
    wipe()
    load(tmp.prevSave)
    
    if (start) {
        setupHTML()
        setupTooltips()
       

        setInterval(save,60000)
        for (let x = 0; x < 5; x++) updateTemp()

        updateHTML()

        let t = (Date.now() - player.offline.current)/1000
        if (player.offline.active && t > 60) simulateTime(t)

        updateTooltipResHTML(true)
       
       
       
        document.onmousemove = e => {
            tmp.cx = e.clientX
            tmp.cy = e.clientY
        }
       
        setInterval(loop, 1000/FPS)
       
        setInterval(checkNaN,1000)
       

        setTimeout(()=>{
            tmp.start = true
        },2000)

       
}

function checkNaN() {
    let naned = findNaN(player)

    if (naned) {
        console.log(naned)

        addNotify("Game Data got NaNed because of "+naned.bold())

        resetTemp()
        tmp.start = true
        loadGame(false, true)
        for (let x = 0; x < 5; x++) updateTemp()
    }
}

function isNaNed(val) {
    return typeof val == "number" ? isNaN(val) : Object.getPrototypeOf(val).constructor.name == "Decimal" ? isNaN(val.mag) : false
}

function findNaN(obj, str=false, data=getPlayerData(), node='player') {
    if (str ? typeof obj == "string" : false) obj = JSON.parse(atob(obj))
    for (let k in obj) {
        if (typeof obj[k] == "number") if (isNaNed(obj[k])) return node+'.'+k
        if (str) {
            if (typeof obj[k] == "string") if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return node+'.'+k
        } else {
            if (obj[k] == null || obj[k] == undefined ? false : Object.getPrototypeOf(obj[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return node+'.'+k
        }
        if (typeof obj[k] == "object") {
            let node2 = findNaN(obj[k], str, data[k], (node?node+'.':'')+k)
            if (node2) return node2
        }
    }
    return false
}

Decimal.prototype.addTP = function (val) {
    var e = this.clone()
    return Decimal.tetrate(10, e.slog(10).add(val))
}

function simulateTime(sec) {
    let ticks = sec * FPS
    let bonusDiff = 0
    let player_before = clonePlayer(player,getPlayerData());
    if (ticks > 1000) {
        bonusDiff = (ticks - 1000) / FPS / 1000
        ticks = 1000
    }
    for (let i=0; i<ticks; i++) {
        updateTemp()
        calc(1/FPS+bonusDiff)
    }

    let h = `You were gone offline for <b>${formatTime(sec)}</b>.<br>`

    let s = {
        mass: player.points.max(1).div(player_before.points.max(1)).log10(),
    }

    let s2 = {
        points: player.points.max(1).log10().max(1).div(player_before.points.max(1).log10().max(1)).log10(),
       
    }

    // console.log(s2)

    if (s2.mass.gte(10)) h += `<br>Your points' exponent<sup>2</sup> is increased by <b>${s2.points.format(2)}</b>.`
    else if (s.mass.gte(10)) h += `<br>Your points' exponent is increased by <b>${s.points.format(2)}</b>.`

    createPopup(h,'offline')
}
}