const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();
require('discord-buttons')(client);
const prefix = process.env.PREFIX
const token = process.env.TOKEN
const keepAlive = require('./server.js')

const commands = require("./scripts/commandsReader")(prefix);

const unknowCommand = require("./scripts/unknowCommands");

client.on("ready", ()=>{
    console.log(`Discord Bot ${client.user.tag} Logged.`);
    client.user.setActivity('New Commands! Type \';help\' to see', { type: "PLAYING" }).catch(console.error);
});

client.on("message", (msg)=>{
if(!msg.author.bot && msg.guild){
    const args = msg.content.split(" ");
    if(commands[args[0]]) commands[args[0]](client,msg);
    else if(args[0].split("")[0] == prefix) unknowCommand(client,msg);
}
});

keepAlive();

client.login(token);