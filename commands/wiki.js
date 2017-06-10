module.exports = class Wiki{
    static match (message){
        return message.content.split(' ')[0] == '!wiki'
    }

    static action (message){
        message.reply('http://www.stellariswiki.com/Stellaris_Wiki')
    }
}