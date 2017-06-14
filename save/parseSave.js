var fs = require('fs')
var JsonDB = require('node-json-db');
var readline = require("./readline.js")

var source="./save/gamestate.txt";
var playerList = [];

class ParseSave {

    static action(){
        try{fs.unlinkSync('./save/playerInfo.json');}catch(e){console.log('Aucune DB à supprimer')};
        
        let database = new JsonDB("./save/playerInfo.json", true, true);

        this.getSaveData(database);

        
    }

    static getSaveData(database){
        var r=readline.fopen(source,"r")
        if(r===false)
        {
        console.log("Error, can't open ", source)
        process.exit(1)
        } 

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

        for(var i = 0; i < playerList.length; i++){
            let player = {};

            try {
                player.id = database.getData("/players[-1]").id + 1;
            } catch(error) { player.id = 1; }

            player.name = playerList[i][0];
            player.country = playerList[i][1];
            player.powerScore = this.getPlayerData(playerList[i][1])[0];
            player.fleetSize = this.getPlayerData(playerList[i][1])[1];
            player.militaryPower = this.getPlayerData(playerList[i][1])[2];
            database.push("/players[]", player, true);
        }
    }

    static getPlayerData(id){
        var r=readline.fopen(source,"r")
        var data = [];
        if(r===false)
        {
            console.log("Error, can't open ", source)
            process.exit(1)
        }
        
        do
        {
            var isData;
            var isPlayerData;
            var line=readline.fgets(r).toString()

            if(line.indexOf('country={') == 0)
                isData = true;
            
            if((isData == true) & (line.indexOf('}') == 0)){
                isData = false;
            }

            if(isData){
            }

            if((isData) & (line.indexOf("\t" + id + '={') == 0)){
                isPlayerData = true;
            }
            
            if((isPlayerData) & (line.indexOf('\t}') == 0)){
                isPlayerData = false;
            }
            
            if((isData) & (isPlayerData)){
                if(line.indexOf('power_score=')!= -1)
                    var powerScore = parseFloat(line.split('=')[1],10);

                if(line.indexOf('fleet_size=')!= -1)
                    var fleetSize = parseInt(line.split('=')[1],10);

                if(line.indexOf('military_power=')== 2)
                    var militaryPower = parseFloat(line.split('=')[1],10);

            }
        }
        while (!readline.eof(r));
        readline.fclose(r);
        data.push(powerScore,fleetSize,militaryPower);
        return data;
    }

}

module.exports = ParseSave;