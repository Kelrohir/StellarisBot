var JsonDB = require('node-json-db');

class Schedule {
    static match(message) {
        return message.content.startsWith('!schedule');
    }

    static action(message) {
        let database = new JsonDB("database.json", true, true);

        let args = message.content.split(" ").slice(1);

        switch (args[0]) {
            case "list":
                return message.channel.send(this.listGames(database));
            case "add":
                return message.channel.send(this.addGame(message, database));
            case "remove":
                return message.channel.send(this.removeGame(args[1], database));
            case "confirm":
                return message.reply(this.confirmGame(message.author.username, args[1], database));

            default: return message.channel.send(this.listGames(database));
        }
    }

    static listGames(database) {
        let games = database.getData("/games");

        let replyContent = "List of scheduled games:";
        
        games.map(function(game) {
            replyContent += "\n\t- **" + game.title + "** [ ID: " + game.id + " ] ( Added by *" + game.author + "* )";
            replyContent += "\n\t\t Date: " + game.date;
            replyContent += "\n\t\t Confirmed: " + game.confirmed.map(function(member) { return " " + member });
        });

        return replyContent;
    }

    static addGame(message, database) {
        let game = {};

        try {
            game.id = database.getData("/games[-1]").id + 1;
        } catch(error) { game.id = 1; }

        game.author = message.author.username;
        game.title = "Hello";
        game.date = new Date().toString();
        game.confirmed = [];

        database.push("/games[]", game, true);
        
        return game.author + " added a game scheduled for " + game.date + " [ ID: " + game.id + " ]";
    }

    static removeGame(gameId, database) {
        let games = database.getData("/games");
        let removed = undefined;
        games.map(function(game, index) {
            if (game.id == gameId) {
                database.delete("/games[" + index + "]");
                removed = game;
            }
        });

        return removed !== undefined ? "Removed **" + removed.title + "** ( " + removed.date + " )" : "Could not find game with the ID " + gameId;
    }

    static confirmGame(username, gameId, database) {
        let games = database.getData("/games");
        let confirmed = undefined;
        let isAlreadyConfirmed = false;
        games.map(function(game, index) {
            if (game.id == gameId) {
                confirmed = game;
                if (game.confirmed.includes(username)) { return isAlreadyConfirmed = true; }
                database.push("/games[" + index + "]/confirmed[]", username, true);
            }
        });
        
        if (isAlreadyConfirmed) { return " you have already confirmed joining **" + confirmed.title + "**" }
        if (confirmed !== undefined) { return " you have confirmed joining **" + confirmed.title + "** ( " + confirmed.date + " )" }
        return " I could not find game with the ID " + gameId;
    }
}

module.exports = Schedule;