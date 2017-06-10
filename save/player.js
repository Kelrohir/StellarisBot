var JsonDB = require('node-json-db');

class Player {
    static match(message){
        return message.content.startsWith('!player')
    }

    static action(message){
        let database = new JsonDB("./save/playerInfo.json", true, true);

        let args = message.content.split(" ").slice(1);

        switch(args[0]){
            case "list":
                return message.channel.send(this.listPlayers(database));
            
            default: return message.channel.send(this.listPlayers(database));
        }
    }

    static listPlayers(database){
        let players = database.getData("/players");

        let replyContent = "List of players:";

        players.map(function(player) {
            replyContent += "\n\t **" + player.name + "**";
        });

        return replyContent;
    }
}

module.exports = Player;