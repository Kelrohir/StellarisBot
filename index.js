const Discord = require('discord.js')
const bot = new Discord.Client()
const Match = require('./commands/match.js')
var JsonDB = require('node-json-db');


bot.on('guildMemberAdd', member => {
    let role = member.guild.roles.find('name', 'Stellaris Noob');
    member.addRole(role).catch(console.error);
})

bot.on('message', message => {
  Match.action(message);
})

let token = new JsonDB("./conf.json", true, true).getData("/token");
bot.login(token);