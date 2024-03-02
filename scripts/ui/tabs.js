const TABS = {
    choose(x, stab=false) {
        if (!stab) {
 
            tmp.tab = x
           
        }
        else {
            tmp.stab[tmp.tab] = x
        }
    },
    1: [
        { id: "Main", icon: "" },
        /*{ id: "Upgrades", icon: "carbon:upgrade", unl() { return player.rp.unl } },*/
       
    ],
    2: {
        0: [
            { id: "Mass" },
           
        ],
    },
}
