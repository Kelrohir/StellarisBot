module.exports = class Capslock{
    static match (message){
          var majNumber = 0
          var pattern = /^[0-9-<>@]+$/
            for(var i=0; i < message.content.length; i++){
                if((message.content.charAt(i).toUpperCase() == message.content.charAt(i)) 
                    &(pattern.test(message.content.charAt(i)) == false))
                {
                majNumber++
                }
            }
        var majRatio = (majNumber/message.content.length)
        return majRatio
    }

    static action (message){
        message.reply('Trop de majuscule!!')
    }
}