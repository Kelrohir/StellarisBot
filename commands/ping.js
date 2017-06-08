module.exports = class Ping{
    static match (message){
        return message.content.startsWith('!ping')
    }

    static action (message){
        message.reply('pong')
    }
}