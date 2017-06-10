var fs = require('fs')
var JsonDB = require('node-json-db');
var readline = require("./readline.js")

var source="./save/gamestate.txt";

class ParseSave {
    static match(message) {
        return message.content.split(' ')[0] == '!update';
    }

    static action(list){
        try{fs.unlinkSync('./save/playerInfo.json');}catch(e){console.log('Aucune DB à supprimer')};
        
        let database = new JsonDB("./save/playerInfo.json", true, true);

        for(var i = 0; i < list.length; i++){
            let player = {};

            try {
                player.id = database.getData("/players[-1]").id + 1;
            } catch(error) { player.id = 1; }

            player.name = list[i][0];
            player.country = list[i][1];
            database.push("/players[]", player, true);
        }
    }

    static getSaveData(){
        console.log("1")
        var r=readline.fopen(source,"r")
        if(r===false)
        {
        console.log("Error, can't open ", source)
        process.exit(1)
        } 

        var playerList = [];
        var countPlayer = -1;

        do
        {
            var isPlayer;
            var line=readline.fgets(r).toString()

            if(line.indexOf('player={') == 0)
                isPlayer = true

            if((isPlayer == true) & (line.indexOf('}') == 0))
                isPlayer = false

            if(isPlayer == true){
                if(line.indexOf('name="')!=-1){
                    var tab = [];
                    tab.push(line.split('"')[1]) ;
                    playerList.push(tab);
                    countPlayer++;
                }
                if(line.indexOf('country=')!=-1){
                    var country = parseInt(line.split('=')[1],10);
                    playerList[countPlayer].push(country);
                }
            }
        }
        while (!readline.eof(r));
        readline.fclose(r);

        this.action(playerList);

    }

}

module.exports = ParseSave;