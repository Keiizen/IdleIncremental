const RESOURCES_DIS = {
    points: {
        unl: ()=>true,
        icon: "",

        desc: (gs)=>format(player.points)+"<br>"+formatGain(player.points, tmp.pointGain.mul(gs)),
    },
    rp: {
        unl: ()=>true,
        icon: "rp",
        class: "red",

        desc: (gs)=>format(player.rp.points,0)+"<br>"+(player.mainUpg.bh.includes(6)||player.mainUpg.atom.includes(6)?formatGain(player.rp.points, tmp.rp.gain.mul(gs)):"(+"+format(tmp.rp.gain,0)+")"),
    
        resetBtn() { FORMS.rp.reset() },
    },

   
}

function reset_res_btn(id) { RESOURCES_DIS[id].resetBtn() }

function setupResourcesHTML() {
    let h1 = ""

    for (i in RESOURCES_DIS) {
        let rd = RESOURCES_DIS[i]

        h1 += `
        <div id="${i}_res_div">
            <div ${i in TOOLTIP_RES ? `id="${i}_tooltip" class="tooltip ${rd.class||""}" tooltip-pos="left" tooltip-align="left" tooltip-text-align="left"` : `class="${rd.class||""}"`}>
                <span style="margin-right: 5px; text-align: right;" id="${i}_res_desc">X</span>
                <div><img src="images/${rd.icon||"empty"}.png" ${rd.resetBtn ? `onclick="reset_res_btn('${i}')" style="cursor: pointer;"` : ""}></div>
            </div>
        </div>
        `

       
    }

    new Element("resources_table").setHTML(h1)
    let restable = document.getElementById("resources_table")
    document.getElementById("app").appendChild(restable)
   
}

function updateResourcesHTML() {
   

    for (i in RESOURCES_DIS) {
        let rd = RESOURCES_DIS[i]
        let unl =  rd.unl()

        tmp.el[i+"_res_div"].setDisplay(unl)

        if (unl) {
            tmp.el[i+"_res_desc"].setHTML(rd.desc(E(1)))
        }
    }
}