const Ping = require('./ping.js')
const Wiki = require('./wiki.js')
const Schedule = require('./Schedule');

const Capslock = require('../moderation/capslock.js')
const ParseSave = require('../save/parseSave.js')
const Player = require('../save/player.js')

module.exports = class Match{
    
    static action (message){

        if (message.content.length > 6 & Capslock.match(message)>0.9){
            Capslock.action(message)
        }
        
        let commands = message.content.split(' ')[0];
        switch(commands){
            case '!ping':
                return Ping.action(message)
            
            case '!schedule':
                return Schedule.action(message)
            
            case '!update':
                return ParseSave.action(message)
            
            case '!players':
                return Player.action(message)

            case '!wiki':
                return Wiki.action(message)
        }
    }
}