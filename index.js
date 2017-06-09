const Discord = require('discord.js')
const bot = new Discord.Client()
const Ping = require('./commands/ping.js')
const Capslock = require('./moderation/capslock.js');
const Schedule = require('./commands/Schedule');
//const Save = require('./gamestate.js')

//console.log(Save[version]);
bot.on('guildMemberAdd', member => {
	let role = member.guild.roles.find('name', 'Stellaris Noob');
	member.addRole(role).catch(console.error);
});

bot.on('message', message => {
	if (Ping.match(message)) {
		return Ping.action(message);
	}
	if (Schedule.match(message)) {
		return Schedule.action(message);
	}
	if (message.content.length > 6 & Capslock.match(message)>0.9) {
		Capslock.action(message);
	}
});

bot.login('MzIxOTI3OTUzNjMyMDY3NTk1.DBlKpw.J_peGM0ux4H17yz_e8VU0Ng0eHc');