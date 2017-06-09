var fs = require('fs')
var readline = require("../node_modules/readline/node-readline.js")
var source="./gamestate.txt"
var target="./demotgt.htm"

var r=readline.fopen(source,"r")
if(r===false)
{
   console.log("Error, can't open ", source)
   process.exit(1)
} 

var w = fs.openSync(target,"w")
var playerList = []
do
{
    var player
    var line=readline.fgets(r)
    fs.writeSync(w, line + "\n", null, 'utf8')
    line = line.toString()
    if(line.indexOf('player={') == 0)
        player = true

    if((player == true) & (line.indexOf('}') == 0))
        player = false

    if(player == true){
        if(line.indexOf('name="')!=-1){
            playerList.push(line.split('"')[1])  
            console.log('hello')   
            console.log(playerList) 
        }
    }
}
while (!readline.eof(r))
readline.fclose(r)
fs.closeSync(w)