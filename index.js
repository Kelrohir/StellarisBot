const Discord = require('discord.js')
const bot = new Discord.Client()


bot.on('guildMemberAdd', member => {
    let role = member.guild.roles.find('name', 'Stellaris Noob');
    member.addRole(role).catch(console.error)
})

bot.on('message', message => {
  if (message.content === '!ping') {
    message.channel.send('pong !')
  }
  if (message.content === '!lol') {
    message.reply('Ferme ta gueule !')
  }
})

bot.login('MzIxOTI3OTUzNjMyMDY3NTk1.DBlKpw.J_peGM0ux4H17yz_e8VU0Ng0eHc')