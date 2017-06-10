const Discord = require('discord.js')
const bot = new Discord.Client()
const Match = require('./commands/match.js')
const config = require('./conf.json');


bot.on('guildMemberAdd', member => {
    let role = member.guild.roles.find('name', 'Stellaris Noob');
    member.addRole(role).catch(console.error);
})

bot.on('message', message => {
  Match.action(message);
})

bot.login(config.token);