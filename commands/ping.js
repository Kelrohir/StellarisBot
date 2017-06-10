module.exports = class Ping{
    static match (message){
        return message.content.split(' ')[0] == '!ping'
    }

    static action (message){
        message.reply('pong')
    }
}