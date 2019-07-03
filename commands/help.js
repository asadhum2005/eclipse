const Discord = require("discord.js");
const config = require('../config.json');

module.exports.run = async(client, message, args) =>{
    let cmds  = new Discord.RichEmbed()
    .setTitle("Help")
    .setDescription('Will be completed soon!')
    message.channel.send("", {
        embed: new Discord.RichEmbed()
        .setColor(message.member.displayColor)
        .setTitle('Commands')
        .setDescription(`
**?help** - shows this message
**?purge [number of messages to delete]** - Delete a number of messages from the current channel
**?f [thing to f for]** - pay your respects!
**?slowmode [number in seconds]** - Slowmode the current channel **Example** ?slowmode 2
**?8ball [question]** - Ask the bot a question and get it to respond with an answer
**?serverinfo** - Display some basic server information
**?userinfo @user** - See a user's basic information. If no user is mentioned then it will display the message author's userinfo
      `)
      .addField("Support", `**[Support Server](${config.supportServer})**`)
    });
};

module.exports.help = {
    name: 'help',
};